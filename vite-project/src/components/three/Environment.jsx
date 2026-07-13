import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const pseudoRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

// Simple component for a single bird
function Bird({ startPos, speed, scale = 0.15 }) {
  const birdRef = useRef()
  const leftWingRef = useRef()
  const rightWingRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const bird = birdRef.current
    if (bird) {
      // Motion is relative to the group's spawn anchor (startPos)
      bird.position.x = Math.sin(t * speed * 0.2) * 8
      bird.position.z = -((t * speed * 4) % 60)
      bird.position.y = Math.sin(t * speed) * 0.5

      // Flapping wings
      if (leftWingRef.current) {
        leftWingRef.current.rotation.z = Math.sin(t * 12) * 0.5
      }
      if (rightWingRef.current) {
        rightWingRef.current.rotation.z = -Math.sin(t * 12) * 0.5
      }
    }
  })

  return (
    <group ref={birdRef} position={startPos} scale={[scale, scale, scale]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.2, 0.1, 0.8]} />
        <meshBasicMaterial color="#2a2418" toneMapped={false} />
      </mesh>
      {/* Left Wing */}
      <mesh ref={leftWingRef} position={[-0.4, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.3]} />
        <meshBasicMaterial color="#3a3320" toneMapped={false} />
      </mesh>
      {/* Right Wing */}
      <mesh ref={rightWingRef} position={[0.4, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.3]} />
        <meshBasicMaterial color="#3a3320" toneMapped={false} />
      </mesh>
    </group>
  )
}

// Sea mist particle system
function SeaMist() {
  const pointsRef = useRef()
  const count = 150

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sp = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 4 + 1) - 0.5) * 40 // x
      pos[i * 3 + 1] = pseudoRandom(i * 4 + 2) * 2 - 1.5 // y (low to water)
      pos[i * 3 + 2] = (pseudoRandom(i * 4 + 3) - 0.5) * 40 // z
      sp[i] = pseudoRandom(i * 4 + 4) * 0.1 + 0.05
    }
    return [pos, sp]
  }, [])

  useFrame((state) => {
    const points = pointsRef.current
    if (points) {
      const posArray = points.geometry.attributes.position.array
      const t = state.clock.getElapsedTime()
      for (let i = 0; i < count; i++) {
        // Drift slowly
        posArray[i * 3] += Math.sin(t * 0.1 + i) * 0.002
        posArray[i * 3 + 1] = -1.6 + Math.sin(t * speeds[i] + i) * 0.3 // bobbing
        posArray[i * 3 + 2] -= 0.005 // move forward

        if (posArray[i * 3 + 2] < -20) {
          posArray[i * 3 + 2] = 20
        }
      }
      points.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c9a84c"
        size={0.06}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function Environment() {
  const cloudsRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (cloudsRef.current) {
      // Slowly rotate and drift clouds
      cloudsRef.current.children.forEach((cloud, idx) => {
        cloud.position.x = cloud.userData.startPos[0] + Math.sin(t * 0.02 + idx) * 5
        cloud.position.z = cloud.userData.startPos[2] + Math.cos(t * 0.01 + idx) * 3
      })
    }
  })

  // Procedural clouds definition
  const clouds = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const x = (pseudoRandom(i * 4 + 101) - 0.5) * 50
      const y = 8 + pseudoRandom(i * 4 + 102) * 4
      const z = -20 - pseudoRandom(i * 4 + 103) * 30
      const scale = 2 + pseudoRandom(i * 4 + 104) * 4
      return {
        key: i,
        startPos: [x, y, z],
        scale: [scale * 1.5, scale * 0.7, scale],
      }
    })
  }, [])

  return (
    <>
      {/* ── Volumetric Sun Glow ── */}
      <group position={[0, 8, -40]}>
        {/* Core Sun */}
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial color="#FFF1C5" />
        </mesh>
        {/* Volumetric Corona Glow */}
        <mesh scale={[1.8, 1.8, 1.8]}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial
            color="#F4C542"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh scale={[3.2, 3.2, 3.2]}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial
            color="#5a420b"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* ── Background Islands (Silhouettes) ── */}
      <group>
        {/* Island Left */}
        <mesh position={[-25, -4, -35]} scale={[12, 6, 8]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#1a1610" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Island Right */}
        <mesh position={[28, -5, -42]} scale={[16, 8, 10]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#1a1610" roughness={0.9} metalness={0.1} />
        </mesh>
      </group>

      {/* ── Floating Clouds ── */}
      <group ref={cloudsRef}>
        {clouds.map((cloud) => (
          <mesh
            key={cloud.key}
            position={cloud.startPos}
            scale={cloud.scale}
            userData={{ startPos: cloud.startPos }}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color="#26231d"
              transparent
              opacity={0.45}
              roughness={1}
              metalness={0}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* ── Flying Birds ── */}
      <Bird startPos={[-10, 4, -10]} speed={1.2} />
      <Bird startPos={[15, 6, -20]} speed={0.9} />
      <Bird startPos={[-4, 7, -30]} speed={1.5} />

      {/* ── Sea Mist Particles ── */}
      <SeaMist />
    </>
  )
}
