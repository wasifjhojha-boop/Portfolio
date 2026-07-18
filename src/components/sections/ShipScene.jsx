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
    <section ref={sectionRef} className="relative w-full min-h-[130vh] bg-[#0d0b08] overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Top & Bottom fade gradients to blend into the rest of the site */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0d0b08] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0b08] to-transparent pointer-events-none z-10" />

      {/* Decorative Border Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#d4a13a]/30 to-transparent z-10" />

      {/* Content Overlay */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <div
          ref={overlayRef}
          className="max-w-2xl transform opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          <p className="font-label text-[10px] md:text-xs tracking-[0.5em] text-[#d4a13a] uppercase mb-4">
            A NEW VOYAGE
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4a13a]/50" />
            <span className="text-[#d4a13a] text-sm">⚓</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4a13a]/50" />
          </div>
          <h2 className="font-headings text-4xl md:text-6xl font-bold tracking-widest text-[#f0e4c8] uppercase mb-6 drop-shadow-xl">
            Uncharted <em className="italic font-light">Waters</em>
          </h2>
          <p className="font-body text-sm text-[#8a8070] italic leading-relaxed">
            Navigating the ever-changing seas of digital marketing — steady hands on paid ads, SEO, and code, charting a course toward measurable growth.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap pointer-events-none">
            {['SEO', 'Google Ads', 'Meta Ads', 'React', 'Three.js'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[9px] font-label tracking-[0.15em] uppercase text-[#8a8070] border border-[#d4a13a]/15 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 pointer-events-auto">
            <a
              href="/contact"
              className="inline-block px-8 py-3 border border-[#d4a13a]/40 bg-[#0d0b08]/40 text-[#f0e4c8] font-label font-semibold text-[10px] tracking-widest uppercase hover:bg-[#d4a13a]/10 hover:border-[#d4a13a] transition-all duration-300 backdrop-blur-sm"
            >
              Set Sail
            </a>
          </div>
        </div>
      </div>

      {/* Bottom wave divider into the footer */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 text-[#0d0b08] z-10"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,45 L1440,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  )
}
