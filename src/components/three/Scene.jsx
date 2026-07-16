import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Ocean from './Ocean'
import Ship from './Ship'
import Environment from './Environment'

// Camera controller that drives mouse parallax and scroll tracking
function CameraController() {
  const targetRotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5
      targetRotation.current.y = -x * 0.18 // Yaw rotation limit
      targetRotation.current.x = -y * 0.12 // Pitch rotation limit
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    const camera = state.camera

    // Mouse movement lerped parallax
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.current.x, 0.05)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.current.y, 0.05)

    // Scroll binding camera tracking
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0

    // Adjust camera height, distance, and tilt based on scroll progress
    camera.position.z = THREE.MathUtils.lerp(9, 6.0, scrollProgress)
    camera.position.y = THREE.MathUtils.lerp(1.5, -0.4, scrollProgress)
    camera.rotation.x += THREE.MathUtils.lerp(0.02, -0.06, scrollProgress)
  })

  return null
}

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none bg-[#0d0b08]">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 9], fov: 42 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene }) => {
          // Dark ambient atmospheric fog to blend the ocean/sky into darkness
          scene.fog = new THREE.FogExp2('#0d0b08', 0.025)
          gl.setClearColor('#0d0b08')
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.6} color="#3a2f1a" />

        {/* Directional Key Light (representing the low sun/sunrise) */}
        <directionalLight
          castShadow
          position={[0, 8, -40]}
          intensity={2.8}
          color="#d4a13a"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.001}
        />

        {/* Hemisphere ambient sky lighting */}
        <hemisphereLight
          intensity={0.8}
          color="#d4a13a"
          groundColor="#0d0b08"
        />

        {/* Front fill light — the sun above is purely backlighting the ship
            from behind, so without this the camera-facing hull reads as a
            near-black silhouette against the dark fog and looks invisible. */}
        <pointLight position={[0, 4, 8]} intensity={1.4} color="#f0e4c8" distance={22} decay={2} />

        {/* 3D Scene Components */}
        <Ocean />
        <Ship />
        <Environment />

        {/* Camera controller for scroll & mouse parallax */}
        <CameraController />
      </Canvas>
    </div>
  )
}
