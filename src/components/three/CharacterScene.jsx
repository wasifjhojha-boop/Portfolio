import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// 3D character for the hero — floats gently, slowly rotates, and leans
// toward the mouse. `mouse` is a ref holding normalized {x, y} in -0.5..0.5.
function Character({ mouse, reducedMotion }) {
  const group = useRef()
  const { scene } = useGLTF('/models/captain.glb')

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      // Draco output ships stale bounds; rebuild + skip culling (small mesh).
      child.geometry.computeBoundingBox()
      child.geometry.computeBoundingSphere()
      child.frustumCulled = false
    }
  })

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.getElapsedTime()
    const idleSpin = reducedMotion ? 0 : Math.sin(t * 0.35) * 0.22
    const targetY = idleSpin + mouse.current.x * 0.5
    const targetX = reducedMotion ? 0 : -mouse.current.y * 0.12
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.05)
  })

  return (
    <group ref={group}>
      {/* Model is ~0.98 units tall, feet at y=0 */}
      <primitive object={scene} position={[0, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/models/captain.glb')

export default function CharacterScene({ mouse, reducedMotion = false }) {
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
          <Character mouse={mouse} reducedMotion={reducedMotion} />
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
