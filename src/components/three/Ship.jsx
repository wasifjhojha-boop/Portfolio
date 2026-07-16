import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simple shader for wind-blown sails
const SailShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#f0e4c8') },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Bend the sail to simulate wind belly
      float bend = sin(uv.y * 3.14159) * 0.45;
      pos.z += bend;
      
      // Wind flutter / ripple
      pos.z += sin(pos.y * 5.0 + uTime * 6.0) * 0.03;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      // Soft shadowing along the bottom/edges of the sail
      float shadow = smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.6, vUv.y);
      vec3 col = mix(uColor * 0.78, uColor, shadow);
      gl_FragColor = vec4(col, 1.0);
    }
  `
}

export default function Ship() {
  const shipGroupRef = useRef()
  const sailMaterialRef = useRef()

  // Replicate wave height function from Ocean.jsx for syncing floating position
  const getWaveHeight = (x, z, time) => {
    const wave1 = Math.sin(x * 0.15 + time * 1.5) * Math.cos(z * 0.15 + time * 1.2) * 0.6
    const wave2 = Math.sin(x * 0.4 - time * 2.2) * Math.sin(z * 0.35 + time * 1.8) * 0.22
    return wave1 + wave2
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const ship = shipGroupRef.current

    if (ship) {
      // Get wave height at the ship's position
      const waveHeight = getWaveHeight(ship.position.x, ship.position.z, t)
      
      // Apply position (floating on waves)
      ship.position.y = -1.8 + waveHeight // offset matching ocean position
      
      // Rocking motions (pitch and roll)
      // Roll: side-to-side rocking
      ship.rotation.z = Math.sin(t * 1.2) * 0.06 + Math.cos(t * 0.8) * 0.03
      // Pitch: front-to-back rocking
      ship.rotation.x = Math.cos(t * 1.0) * 0.04 + Math.sin(t * 1.5) * 0.02
      // Yaw: gentle drifting heading
      ship.rotation.y = Math.sin(t * 0.3) * 0.05
    }

    if (sailMaterialRef.current) {
      sailMaterialRef.current.uniforms.uTime.value = t
    }
  })

  return (
    <group ref={shipGroupRef} position={[0, -1.8, 0]} scale={[0.45, 0.45, 0.45]}>
      {/* ── HULL ── */}
      {/* Keel/Lower Hull */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.8, 4]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Raised Stern (Rear Castle) */}
      <mesh castShadow receiveShadow position={[0, 0.5, -1.6]}>
        <boxGeometry args={[1.5, 0.6, 1.2]} />
        <meshStandardMaterial color="#7a5638" roughness={0.95} />
      </mesh>
      
      {/* Raised Bow (Front Deck) */}
      <mesh castShadow receiveShadow position={[0, 0.4, 1.6]}>
        <boxGeometry args={[1.4, 0.4, 1]} />
        <meshStandardMaterial color="#7a5638" roughness={0.95} />
      </mesh>

      {/* Pointy Bow nose */}
      <mesh castShadow receiveShadow position={[0, 0.2, 2.3]} rotation={[Math.PI / 6, 0, 0]}>
        <coneGeometry args={[0.5, 1.2, 4]} />
        <meshStandardMaterial color="#4a3220" roughness={0.9} />
      </mesh>
      
      {/* Gold Trim along Hull */}
      <mesh position={[0.76, 0.3, 0]}>
        <boxGeometry args={[0.04, 0.08, 3.8]} />
        <meshStandardMaterial color="#F4C542" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-0.76, 0.3, 0]}>
        <boxGeometry args={[0.04, 0.08, 3.8]} />
        <meshStandardMaterial color="#F4C542" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ── MASTS ── */}
      {/* Main Mast (Center) */}
      <mesh castShadow position={[0, 2, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 4]} />
        <meshStandardMaterial color="#8a6244" roughness={0.8} />
      </mesh>

      {/* Foremast (Front) */}
      <mesh castShadow position={[0, 1.7, 1.2]}>
        <cylinderGeometry args={[0.07, 0.1, 3.4]} />
        <meshStandardMaterial color="#8a6244" roughness={0.8} />
      </mesh>

      {/* Bowsprit (Nose Mast) */}
      <mesh castShadow position={[0, 0.4, 2.8]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 1.8]} />
        <meshStandardMaterial color="#8a6244" roughness={0.8} />
      </mesh>

      {/* ── SAILS ── */}
      {/* Main Sail (Center) */}
      <mesh castShadow position={[0, 2.3, 0.05]}>
        <planeGeometry args={[1.8, 1.8, 16, 16]} />
        <shaderMaterial
          ref={sailMaterialRef}
          args={[SailShader]}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main Top Sail (Center Upper) */}
      <mesh castShadow position={[0, 3.4, 0.05]}>
        <planeGeometry args={[1.3, 1.0, 16, 16]} />
        <shaderMaterial
          args={[SailShader]}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Fore Sail (Front mast) */}
      <mesh castShadow position={[0, 2.0, 1.25]}>
        <planeGeometry args={[1.4, 1.5, 16, 16]} />
        <shaderMaterial
          args={[SailShader]}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── GOLD BANNER (Waving flag at main mast top) ── */}
      <mesh position={[0, 4.0, -0.3]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.6]} />
        <meshStandardMaterial color="#F4C542" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* ── CANNONS (Small decorative cylinders) ── */}
      {[-1, 0, 1].map((posZ, idx) => (
        <React.Fragment key={idx}>
          {/* Port side */}
          <mesh position={[0.7, 0.1, posZ * 0.9]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.4]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Starboard side */}
          <mesh position={[-0.7, 0.1, posZ * 0.9]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.4]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.8} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  )
}