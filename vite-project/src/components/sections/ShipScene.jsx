import { useRef, useEffect } from 'react'
import Scene from '../three/Scene'

export default function ShipScene() {
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          overlayRef.current?.classList.add('opacity-100')
          overlayRef.current?.classList.remove('translate-y-8', 'opacity-0')
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#050403] overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Top & Bottom fade gradients to blend into the rest of the site */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050403] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050403] to-transparent pointer-events-none z-10" />

      {/* Decorative Border Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent z-10" />

      {/* Content Overlay */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <div
          ref={overlayRef}
          className="max-w-2xl transform opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          <p className="font-headings text-[10px] md:text-xs tracking-[0.5em] text-[#c9a84c] uppercase mb-4">
            A NEW VOYAGE
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span className="text-[#c9a84c] text-sm">⚓</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>
          <h2 className="font-headings text-4xl md:text-6xl font-bold tracking-widest text-[#f5e6c8] uppercase mb-6 drop-shadow-xl">
            Uncharted <em className="italic font-light">Waters</em>
          </h2>
          <p className="font-body text-sm text-[#8a8070] italic leading-relaxed">
            Navigating the stormy seas of digital marketing. The ship remains steady, forged in gold and iron, charting a course toward absolute dominance.
          </p>
          
          <div className="mt-12 pointer-events-auto">
            <a
              href="/contact"
              className="inline-block px-8 py-3 border border-[#c9a84c]/40 bg-[#050403]/40 text-[#f5e6c8] font-headings font-bold text-[10px] tracking-widest uppercase hover:bg-[#c9a84c]/10 hover:border-[#c9a84c] transition-all duration-300 backdrop-blur-sm"
            >
              Set Sail
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
