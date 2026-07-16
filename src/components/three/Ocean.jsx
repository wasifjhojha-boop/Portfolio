import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const OceanShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorDark: { value: new THREE.Color('#0a1628') },
    uColorLight: { value: new THREE.Color('#2b2515') },
    uColorFoam: { value: new THREE.Color('#d4a13a') },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vHeight;

    // Simple 2D Pseudo-random noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
        mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
        u.y
      );
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Multi-layered sine wave displacements
      float wave1 = sin(pos.x * 0.15 + uTime * 1.5) * cos(pos.y * 0.15 + uTime * 1.2) * 0.6;
      float wave2 = sin(pos.x * 0.4 - uTime * 2.2) * sin(pos.y * 0.35 + uTime * 1.8) * 0.22;
      float wave3 = noise(pos.xy * 0.85 + uTime * 0.8) * 0.1;
      
      pos.z += wave1 + wave2 + wave3;
      vHeight = pos.z;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorDark;
    uniform vec3 uColorLight;
    uniform vec3 uColorFoam;
    varying vec2 vUv;
    varying float vHeight;

    void main() {
      // Normalize height to 0..1 range
      float h = (vHeight + 0.9) / 1.8;
      h = clamp(h, 0.0, 1.0);
      
      // Blend between dark deep ocean and lighter turquoise/blue
      vec3 color = mix(uColorDark, uColorLight, h);
      
      // Foam factor at the peaks of waves
      float foam = smoothstep(0.68, 0.95, h);
      vec3 finalColor = mix(color, uColorFoam, foam * 0.35);
      
      // Soft ambient brightness on wave caps
      finalColor += vec3(vHeight * 0.04);
      
      gl_FragColor = vec4(finalColor, 0.88);
    }
  `
}

export default function Ocean() {
  const meshRef = useRef()
  const materialRef = useRef()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
      receiveShadow
    >
      <planeGeometry args={[120, 120, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        args={[OceanShader]}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
