import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from '../three/Scene'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  {
    id: 'prologue',
    progress: [0, 0.16],
    title: 'MOHD WASIF',
    subtitle: 'PERFORMANCE MARKETING & ENGINEERING',
    body: 'Forging digital empires through high-performance ads, masterclass SEO, and modern engineering architecture.',
    sigil: '✦',
  },
  {
    id: 'marketing',
    progress: [0.16, 0.32],
    title: 'Precision Targeting',
    subtitle: 'GOOGLE & META ADS SPECIALIST',
    body: 'Commanding search and social landscapes. Architecting intent-driven campaigns that turn clicks into customers and scale revenue efficiently.',
    sigil: '🎯',
  },
  {
    id: 'seo',
    progress: [0.32, 0.48],
    title: 'Organic Dominion',
    subtitle: 'TECHNICAL SEO EXPERT',
    body: "Securing the top ranks. Technical audits, semantic keyword strategies, and high-authority link building to cement your digital presence.",
    sigil: '📈',
  },
  {
    id: 'development',
    progress: [0.48, 0.64],
    title: 'Flawless Architecture',
    subtitle: "REACT & NEXT.JS DEVELOPER",
    body: 'Building fast, accessible, and scalable applications. Modern tech stacks crafted for rapid load times and impeccable user experiences.',
    sigil: '⚡',
  },
  {
    id: 'wordpress',
    progress: [0.64, 0.80],
    title: 'Custom Frameworks',
    subtitle: 'WORDPRESS DEVELOPER',
    body: 'Bespoke themes, headless integrations, and robust plugin architecture. Transforming standard CMS platforms into tailored marketing engines.',
    sigil: '⚙️',
  },
  {
    id: 'cta',
    progress: [0.80, 1.0],
    title: 'Command Your Market',
    subtitle: 'THE TIME TO ACT IS NOW',
    body: 'Elevate your brand, dominate search results, and convert traffic into unwavering loyalty.',
    sigil: '♛',
  },
]

export default function Hero() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const overlayRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const bodyRef = useRef(null)
  const progressRef = useRef(null)
  const vignetteRef = useRef(null)
  const chapterLabelRef = useRef(null)
  const runeBarRef = useRef(null)

  const [activeChapter, setActiveChapter] = useState(0)
  const [ready, setReady] = useState(false)

  const prevChapter = useRef(-1)

  const transitionChapter = (idx) => {
    if (prevChapter.current === idx) return
    prevChapter.current = idx
    setActiveChapter(idx)

    const ch = CHAPTERS[idx]
    if (!ch) return

    const tl = gsap.timeline()

    // Fade out old text
    tl.to([titleRef.current, subtitleRef.current, bodyRef.current], {
      y: -16,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      stagger: 0.02,
    })
    // Update text content mid-fade
    .call(() => {
      if (titleRef.current) titleRef.current.textContent = ch.title
      if (subtitleRef.current) subtitleRef.current.textContent = ch.subtitle
      if (bodyRef.current) bodyRef.current.textContent = ch.body
    })
    // Fade in new text
    .fromTo(
      [subtitleRef.current, titleRef.current, bodyRef.current],
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.05 }
    )

    // Chapter label transition
    if (chapterLabelRef.current) {
      gsap.fromTo(
        chapterLabelRef.current,
        { opacity: 0, x: 8 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
      )
      chapterLabelRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(
        CHAPTERS.length
      ).padStart(2, '0')}`
    }
  }

  // Initialise chapter text + drop the loading veil once mounted
  useEffect(() => {
    const ch0 = CHAPTERS[0]
    if (titleRef.current) titleRef.current.textContent = ch0.title
    if (subtitleRef.current) subtitleRef.current.textContent = ch0.subtitle
    if (bodyRef.current) bodyRef.current.textContent = ch0.body

    const t = setTimeout(() => setReady(true), 700)
    return () => clearTimeout(t)
  }, [])

  // Setup GSAP ScrollTrigger — chapter storytelling driven purely by scroll
  useEffect(() => {
    const scrollHeight = window.innerHeight * 6

    // Pin viewport
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${scrollHeight}`,
      pin: stickyRef.current,
      pinSpacing: true,
      anticipatePin: 1,
    })

    // Main scroll-linked timeline (chapters + progress + vignette)
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollHeight}`,
        scrub: 1.0,
        onUpdate: (self) => {
          // Bottom progress bar width
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`
          }

          // Active chapter detection based on scroll progress
          const p = self.progress
          const idx = CHAPTERS.findIndex((c) => p >= c.progress[0] && p < c.progress[1])
          transitionChapter(idx === -1 ? CHAPTERS.length - 1 : idx)

          // Vignette pulse
          const vinInt = 0.65 + Math.sin(p * Math.PI) * 0.15
          if (vignetteRef.current) {
            vignetteRef.current.style.opacity = String(vinInt)
          }
        },
      },
    })

    // Subtle overlay color gradient shift
    gsap.to(overlayRef.current, {
      background: 'linear-gradient(to top, rgba(13,11,8,0.95) 0%, rgba(13,11,8,0.2) 60%)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollHeight}`,
        scrub: 1.5,
      },
    })

    // Staggered entrance
    gsap.fromTo(
      [subtitleRef.current, titleRef.current, bodyRef.current],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.08, delay: 0.2 }
    )

    // Rune bar tick animations
    if (runeBarRef.current) {
      const ticks = runeBarRef.current.querySelectorAll('.rune-tick')
      gsap.fromTo(
        ticks,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 0.6,
          stagger: 0.005,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      )
    }

    return () => {
      scrubTl.kill()
      pinTrigger.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 bg-[#0d0b08] z-[999] flex flex-col items-center justify-center gap-6 transition-all duration-1000 ${
          ready ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="font-headings text-2xl md:text-3xl text-[#d4a13a] tracking-widest uppercase animate-pulse drop-shadow-[0_0_10px_rgba(212,161,58,0.3)]">
          MOHD WASIF
        </div>
        <div className="font-headings text-[10px] tracking-[0.3em] text-[#8a8070] uppercase">
          ASSEMBLING DIGITAL FLEET...
        </div>
        <div className="w-40 h-[1px] bg-[#d4a13a]/20 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-[#d4a13a] animate-load-fill w-full" />
        </div>
      </div>

      {/* Main Scroll Container */}
      <div
        ref={containerRef}
        className="relative w-full bg-black"
        style={{ height: `${window.innerHeight * 6 + window.innerHeight}px` }}
      >
        {/* Sticky Viewport Wrapper */}
        <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden bg-[#0d0b08]">
          {/* 3D Ocean & Ship Scene (background) */}
          <div className="absolute inset-0">
            <Scene />
          </div>

          {/* Vignette Layer */}
          <div
            ref={vignetteRef}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(13,11,8,0.9)_100%)] pointer-events-none z-10 transition-opacity duration-300"
          />

          {/* Overlay Gradient */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/90 via-transparent to-transparent pointer-events-none z-10"
          />

          {/* Corner Ornaments */}
          {['top-6 left-6', 'top-6 right-6 scale-x-[-1]', 'bottom-6 left-6 scale-y-[-1]', 'bottom-6 right-6 scale-[-1]'].map(
            (pos, idx) => (
              <div key={idx} className={`absolute w-10 h-10 pointer-events-none z-20 ${pos}`}>
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
                  <path d="M2 2 L2 20 M2 2 L20 2" stroke="#d4a13a" strokeWidth="1" />
                  <path d="M2 2 L8 8" stroke="#d4a13a" strokeWidth="0.5" />
                  <rect x="1" y="1" width="4" height="4" fill="none" stroke="#d4a13a" strokeWidth="0.5" />
                </svg>
              </div>
            )
          )}

          {/* Rune Bar */}
          <div ref={runeBarRef} className="absolute top-24 left-6 right-6 md:left-12 md:right-12 z-20 hidden sm:flex items-center h-[1px]">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className={`rune-tick flex-1 h-full bg-[#d4a13a]/20 transform-origin-bottom ${
                  i % 3 === 0 ? 'h-[4px] bg-[#d4a13a]/50' : i % 7 === 0 ? 'h-[2px]' : ''
                }`}
              />
            ))}
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-16 md:bottom-24 left-6 right-6 md:left-16 md:right-16 max-w-3xl z-20 select-text">
            {/* Eyebrow subtitle with accent rule */}
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[2px] w-10 bg-[#d4a13a] shrink-0 shadow-[0_0_8px_rgba(212,161,58,0.6)]" />
              <span
                ref={subtitleRef}
                className="font-headings text-[10px] md:text-xs tracking-[0.45em] text-[#d4a13a] uppercase block"
              />
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-headings text-5xl md:text-8xl font-black text-gold-gradient leading-[0.95] uppercase mb-6 tracking-tight drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]"
            />

            {/* Description */}
            <p
              ref={bodyRef}
              className="font-body text-base md:text-lg text-[#e6dcc4] max-w-xl leading-relaxed"
            />

            {/* CTAs directly under the headline */}
            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <a
                href="/projects"
                className="px-7 py-3.5 rounded-sm bg-gradient-to-br from-[#e8c97a] via-[#d4a13a] to-[#b8862a] text-[#0d0b08] font-headings font-bold text-[10px] tracking-[0.2em] uppercase shadow-[0_6px_20px_-6px_rgba(212,161,58,0.6)] hover:shadow-[0_10px_28px_-6px_rgba(212,161,58,0.7)] hover:-translate-y-0.5 transition-all duration-300"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="px-7 py-3.5 rounded-sm border border-[#d4a13a]/40 bg-[#0d0b08]/50 text-[#f0e4c8] font-headings font-bold text-[10px] tracking-[0.2em] uppercase hover:border-[#d4a13a] hover:bg-[#d4a13a]/10 hover:text-[#d4a13a] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right Indicator Panel */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-6">
            <div ref={chapterLabelRef} className="font-headings text-[10px] tracking-[0.2em] text-[#d4a13a]/50 writing-vertical select-none">
              01 / 06
            </div>
            <div className="w-[1px] h-16 bg-gradient-to-b from-[#d4a13a]/40 to-transparent" />
            <div className="flex flex-col gap-2.5">
              {CHAPTERS.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 transform rotate-45 transition-all duration-300 ${
                    i === activeChapter ? 'bg-[#d4a13a] scale-150 shadow-[0_0_8px_#d4a13a]' : 'bg-[#d4a13a]/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4a13a]/10 z-20">
            <div ref={progressRef} className="h-full bg-[#d4a13a] shadow-[0_0_10px_#d4a13a] w-0 transition-all duration-75" />
          </div>

          {/* Scroll Indicator */}
          <div
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500 ${
              activeChapter === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-6 h-10 rounded-full border-2 border-[#d4a13a]/50 flex justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-[#d4a13a] animate-scroll-dot" />
            </div>
            <span className="font-headings text-[9px] tracking-[0.3em] text-[#d4a13a]/60 uppercase">Scroll</span>
          </div>
        </div>
      </div>
    </>
  )
}
