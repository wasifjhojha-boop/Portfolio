import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const pseudoRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

// A flock of birds — each drifts across the sky on its own lane, so as the
// hero camera pans while you scroll, birds continuously sweep through view.
const FLOCK = [
  { anchor: [-6, 5, -12], speed: 1.1, phase: 0, scale: 0.16 },
  { anchor: [8, 7, -18], speed: 0.9, phase: 12, scale: 0.14 },
  { anchor: [-2, 8, -26], speed: 1.4, phase: 24, scale: 0.12 },
  { anchor: [4, 6, -14], speed: 1.0, phase: 36, scale: 0.15 },
  { anchor: [-10, 9, -30], speed: 1.25, phase: 48, scale: 0.11 },
  { anchor: [2, 4.5, -10], speed: 1.15, phase: 60, scale: 0.17 },
  { anchor: [12, 8.5, -34], speed: 0.85, phase: 18, scale: 0.1 },
  { anchor: [-14, 6.5, -22], speed: 1.3, phase: 42, scale: 0.13 },
  { anchor: [0, 10, -40], speed: 1.05, phase: 54, scale: 0.1 },
]

// Simple component for a single bird
function Bird({ anchor, speed, phase = 0, scale = 0.15 }) {
  const birdRef = useRef()
  const leftWingRef = useRef()
  const rightWingRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const bird = birdRef.current
    if (bird) {
      // Glide across the sky from right to left on this bird's lane, looping
      const cycle = (t * speed * 2.5 + phase) % 70
      bird.position.x = anchor[0] + 35 - cycle
      bird.position.y = anchor[1] + Math.sin(t * speed * 1.5 + phase) * 0.5
      bird.position.z = anchor[2]

      // Flapping wings
      const flap = Math.sin(t * 12 + phase) * 0.6
      if (leftWingRef.current) leftWingRef.current.rotation.z = flap
      if (rightWingRef.current) rightWingRef.current.rotation.z = -flap
    }
  })

  return (
    <group ref={birdRef} scale={[scale, scale, scale]}>
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

// Gradient sky dome — deep blue zenith falling to a hazy horizon that
// matches the scene fog, so the sky reads as depth instead of a flat fill.
const SkyShader = {
  uniforms: {
    uZenith: { value: new THREE.Color('#4f9fd6') },
    uHorizon: { value: new THREE.Color('#bcd6ea') },
  },
  vertexShader: `
    varying vec3 vDir;
    void main() {
      vDir = normalize(position);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uZenith;
    uniform vec3 uHorizon;
    varying vec3 vDir;
    void main() {
      float h = clamp(vDir.y, 0.0, 1.0);
      // Ease the blend so the horizon band feels wide and atmospheric
      vec3 col = mix(uHorizon, uZenith, pow(h, 0.55));
      gl_FragColor = vec4(col, 1.0);
    }
  `,
}

function SkyDome() {
  return (
    <mesh>
      <sphereGeometry args={[220, 32, 24]} />
      <shaderMaterial args={[SkyShader]} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  )
}

// A puffy cumulus cloud built from a few overlapping soft blobs
function PuffCloud({ position, scale, seed = 0 }) {
  const puffs = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      key: i,
      pos: [
        (pseudoRandom(seed + i * 3 + 1) - 0.5) * 2.2,
        (pseudoRandom(seed + i * 3 + 2) - 0.5) * 0.5,
        (pseudoRandom(seed + i * 3 + 3) - 0.5) * 1.2,
      ],
      r: 0.55 + pseudoRandom(seed + i * 7 + 4) * 0.55,
    }))
  }, [seed])

  return (
    <group position={position} scale={scale} userData={{ startPos: position }}>
      {puffs.map((p) => (
        <mesh key={p.key} position={p.pos}>
          <sphereGeometry args={[p.r, 14, 14]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.9} roughness={1} metalness={0} />
        </mesh>
      ))}
      {/* Flat shadowed base to give the cumulus its anvil bottom */}
      <mesh position={[0, -0.45, 0]} scale={[1.6, 0.35, 1.1]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial color="#dfe9f2" transparent opacity={0.85} roughness={1} metalness={0} />
      </mesh>
    </group>
  )
}

// A layered tropical island: rocky base, green canopy, sandy shore and palms
function Island({ position, scale = 1, mirror = false }) {
  return (
    <group position={position} scale={[mirror ? -scale : scale, scale, scale]}>
      {/* Sandy shore ring */}
      <mesh position={[0, -0.4, 0]} scale={[1.35, 0.25, 1.2]}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial color="#d8c49a" roughness={1} metalness={0} />
      </mesh>
      {/* Rocky body */}
      <mesh position={[0, 0.15, 0]} scale={[1, 0.85, 0.9]}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial color="#7a6a52" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* Green canopy */}
      <mesh position={[0, 0.7, 0]} scale={[0.85, 0.6, 0.75]}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial color="#3f7a38" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0.45, 0.55, 0.25]} scale={[0.45, 0.35, 0.4]}>
        <sphereGeometry args={[1, 14, 12]} />
        <meshStandardMaterial color="#4c8a40" roughness={0.9} metalness={0} />
      </mesh>
      {/* Palm — trunk + frond cone on the shore */}
      <group position={[0.95, 0.05, 0.35]} rotation={[0, 0, -0.18]}>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.035, 0.06, 0.75, 6]} />
          <meshStandardMaterial color="#6b4a2f" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.78, 0]}>
          <coneGeometry args={[0.28, 0.22, 7]} />
          <meshStandardMaterial color="#3f8a3c" roughness={0.85} />
        </mesh>
      </group>
    </group>
  )
}

// Soft circular sprite so particles render as round dots, not square quads
function useSoftDot() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.4, 'rgba(255,255,255,0.6)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(c)
    tex.needsUpdate = true
    return tex
  }, [])
}

// Sea mist particle system
function SeaMist() {
  const pointsRef = useRef()
  const dot = useSoftDot()
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
        map={dot}
        color="#ffffff"
        size={0.12}
        transparent
        opacity={0.35}
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
      {/* ── Gradient Sky Dome ── */}
      <SkyDome />

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

      {/* ── Tropical Islands ── */}
      <Island position={[-25, -3.2, -35]} scale={9} />
      <Island position={[28, -3.6, -42]} scale={12} mirror />
      <Island position={[6, -2.6, -58]} scale={6} />

      {/* ── Floating Puffy Clouds ── */}
      <group ref={cloudsRef}>
        {clouds.map((cloud) => (
          <PuffCloud
            key={cloud.key}
            position={cloud.startPos}
            scale={cloud.scale}
            seed={cloud.key * 13}
          />
        ))}
      </group>

      {/* ── Flying Birds (flock) ── */}
      {FLOCK.map((b, i) => (
        <Bird key={i} anchor={b.anchor} speed={b.speed} phase={b.phase} scale={b.scale} />
      ))}

      {/* ── Sea Mist Particles ── */}
      <SeaMist />
    </>
  )
}
