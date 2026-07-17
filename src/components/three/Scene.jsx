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
    <div className="absolute inset-0 w-full h-full pointer-events-none bg-[#bcd6ea]">
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 9], fov: 42 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene }) => {
          // Bright daytime sky-blue atmospheric haze
          scene.fog = new THREE.FogExp2('#bcd6ea', 0.014)
          gl.setClearColor('#bcd6ea')
        }}
      >
        {/* Lights */}
        <ambientLight intensity={1.1} color="#eaf2ff" />

        {/* Directional Key Light — high midday sun */}
        <directionalLight
          castShadow
          position={[12, 22, 8]}
          intensity={2.6}
          color="#fff6e0"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.001}
        />

        {/* Hemisphere sky/water bounce lighting */}
        <hemisphereLight
          intensity={1.0}
          color="#cfe6fa"
          groundColor="#5a8ba6"
        />

        {/* Soft front fill so the camera-facing hull stays bright */}
        <pointLight position={[0, 4, 8]} intensity={0.9} color="#ffffff" distance={22} decay={2} />

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
