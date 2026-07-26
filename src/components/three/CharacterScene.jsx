import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// One showcased GLB. Scales in when `active`, collapses to nothing when not,
// so scrolling crossfades between models. Also floats/leans toward the mouse.
function Model({ url, active, baseY = 0, baseScale = 1, mouse, reducedMotion }) {
  const group = useRef()
  const { scene } = useGLTF(url)

  // Clone the cached GLTF: other canvases (ship captain) may load the same
  // URL, and a THREE object can only live in one scene at a time.
  const model = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        // Draco output ships stale bounds; rebuild + skip culling.
        child.geometry.computeBoundingBox()
        child.geometry.computeBoundingSphere()
        child.frustumCulled = false
      }
    })
    return clone
  }, [scene])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.getElapsedTime()

    // Scale in/out on slide change
    const targetScale = active ? baseScale : 0.0001
    const s = THREE.MathUtils.lerp(g.scale.x, targetScale, 0.09)
    g.scale.setScalar(s)

    // Idle rotation + mouse lean (only meaningful while visible)
    const idleSpin = reducedMotion ? 0 : Math.sin(t * 0.35) * 0.22
    const targetY = idleSpin + mouse.current.x * 0.5
    const targetX = reducedMotion ? 0 : -mouse.current.y * 0.12
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.05)
  })

  return (
    <group ref={group} scale={active ? 1 : 0.0001}>
      {/* Models are authored facing -z; rotate 180° to face the camera. */}
      <primitive object={model} position={[0, baseY, 0]} rotation={[0, Math.PI, 0]} />
    </group>
  )
}

useGLTF.preload('/models/captain.glb')
useGLTF.preload('/models/character2.glb')

// slide 0 → standing model, slide 1 → second model, slide >= 2 → photos
// (handled outside the canvas; both models collapse away).
export default function CharacterScene({ mouse, slide = 0, reducedMotion = false }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.62, 2.15], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ camera }) => camera.lookAt(0, 0.48, 0)}
      style={{ background: 'transparent' }}
    >
      {/* Cinematic soft lighting: warm key, cool fill, gold rim */}
      <ambientLight intensity={0.85} color="#fff8ec" />
      <directionalLight
        castShadow
        position={[2.5, 4, 2.5]}
        intensity={1.7}
        color="#ffffff"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-3, 2, -1]} intensity={0.5} color="#dce8f5" />
      <pointLight position={[-1.6, 1.2, -1.8]} intensity={1.2} color="#d4a13a" distance={8} decay={2} />

      <Suspense fallback={null}>
        <Float
          enabled={!reducedMotion}
          speed={1.4}
          rotationIntensity={0}
          floatIntensity={0.35}
          floatingRange={[-0.04, 0.04]}
        >
          {/* Standing figure: ~0.98 tall, feet at y=0 */}
          <Model
            url="/models/captain.glb"
            active={slide === 0}
            mouse={mouse}
            reducedMotion={reducedMotion}
          />
          {/* Second figure: bounds y -0.33..0.54, so lift feet to ground and
              scale slightly to match the first model's height */}
          <Model
            url="/models/character2.glb"
            active={slide === 1}
            baseY={0.33}
            baseScale={1.12}
            mouse={mouse}
            reducedMotion={reducedMotion}
          />
        </Float>
        <ContactShadows
          position={[0, -0.02, 0]}
          opacity={0.38}
          scale={3.2}
          blur={2.6}
          far={2}
          color="#3a2e18"
        />
      </Suspense>
    </Canvas>
  )
}
