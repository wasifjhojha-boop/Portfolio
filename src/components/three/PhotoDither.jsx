import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Mouse-following halftone / dither lens: the image reads normally, but a
// soft circular region around the cursor breaks into rippling dot-matrix
// dots — a digital "scan" that follows the pointer.
const fragmentShader = `
  uniform sampler2D uTex;
  uniform vec2 uMouse;
  uniform float uActive;
  uniform float uTime;
  uniform float uImgAspect;
  varying vec2 vUv;

  void main() {
    // Cover-fit the image into the (square) frame without distortion
    float r = uImgAspect; // frame aspect = 1
    vec2 s = vec2(1.0);
    if (r > 1.0) s.x = 1.0 / r; else s.y = r;
    vec2 cuv = (vUv - 0.5) * s + 0.5;

    // Distance from cursor, in frame space
    float d = distance(vUv, uMouse);
    float innerR = 0.105; // fully-active core
    float outerR = 0.30;  // fades to 0 by here
    float lens = (1.0 - smoothstep(innerR, outerR, d)) * uActive;

    // Concentric ripple displacement inside the lens
    vec2 dir = normalize(vUv - uMouse + 1e-4);
    float ripple = sin(d * 55.0 - uTime * 4.0) * 0.010 * lens;
    vec2 dispUv = clamp(cuv + dir * ripple, 0.0, 1.0);

    vec4 base = texture2D(uTex, cuv);
    vec4 disp = texture2D(uTex, dispUv);

    // Halftone dot screen on the displaced sample
    float cells = 95.0;
    vec2 gp = fract(vUv * cells) - 0.5;
    float lum = dot(disp.rgb, vec3(0.299, 0.587, 0.114));
    float dotR = sqrt(clamp(1.0 - lum, 0.0, 1.0)) * 0.6;
    float dotMask = smoothstep(dotR, dotR - 0.09, length(gp));
    vec3 paper = vec3(0.06, 0.05, 0.04);
    vec3 halftone = mix(paper, disp.rgb * 1.15, dotMask);

    vec3 col = mix(base.rgb, halftone, lens);
    gl_FragColor = vec4(col, base.a);
  }
`

function Plane({ src, mouseRef, activeRef }) {
  const tex = useTexture(src)

  const uniforms = useMemo(
    () => ({
      uTex: { value: null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uActive: { value: 0 },
      uTime: { value: 0 },
      uImgAspect: { value: 1 },
    }),
    []
  )

  uniforms.uTex.value = tex
  if (tex.image) uniforms.uImgAspect.value = tex.image.width / tex.image.height

  const cur = useRef({ x: 0.5, y: 0.5, a: 0 })
  useFrame((state) => {
    cur.current.x += (mouseRef.current.x - cur.current.x) * 0.14
    cur.current.y += (mouseRef.current.y - cur.current.y) * 0.14
    cur.current.a += (activeRef.current - cur.current.a) * 0.08
    uniforms.uMouse.value.set(cur.current.x, cur.current.y)
    uniforms.uActive.value = cur.current.a
    uniforms.uTime.value = state.clock.getElapsedTime()
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent />
    </mesh>
  )
}

export default function PhotoDither({ src = '/wasif-photo.jpg' }) {
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const activeRef = useRef(0)

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current.x = (e.clientX - rect.left) / rect.width
    mouseRef.current.y = 1 - (e.clientY - rect.top) / rect.height // flip to uv space
  }

  return (
    <div
      className="absolute inset-0"
      onPointerMove={handleMove}
      onPointerEnter={() => (activeRef.current = 1)}
      onPointerLeave={() => (activeRef.current = 0)}
    >
      <Canvas
        orthographic
        camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10, position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Plane src={src} mouseRef={mouseRef} activeRef={activeRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
