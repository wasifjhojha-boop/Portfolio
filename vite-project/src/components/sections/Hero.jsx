import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    body: 'Commanding search and social landscapes. Architecting intent-driven campaigns that turn clicks into kingdoms and scale revenue efficiently.',
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
  const videoRef = useRef(null)
  const overlayRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const bodyRef = useRef(null)
  const sigilRef = useRef(null)
  const progressRef = useRef(null)
  const vignetteRef = useRef(null)
  const chapterLabelRef = useRef(null)
  const runeBarRef = useRef(null)

  const [activeChapter, setActiveChapter] = useState(0)
  const [videoReady, setVideoReady] = useState(false)

  const prevChapter = useRef(-1)

  const transitionChapter = (idx) => {
    if (prevChapter.current === idx) return
    prevChapter.current = idx
    setActiveChapter(idx)

    const ch = CHAPTERS[idx]
    if (!ch) return

    const tl = gsap.timeline()

    // Fade out old text
    tl.to([titleRef.current, subtitleRef.current, bodyRef.current, sigilRef.current], {
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
      if (sigilRef.current) sigilRef.current.textContent = ch.sigil
    })
    // Fade in new text
    .fromTo(
      [sigilRef.current, subtitleRef.current, titleRef.current, bodyRef.current],
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

  // Setup video metadata loaded listener
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onReady = () => {
      setTimeout(() => setVideoReady(true), 1200)
    }

    video.addEventListener('loadedmetadata', onReady)
    if (video.readyState >= 1) onReady()

    // Initialize text
    const ch0 = CHAPTERS[0]
    if (titleRef.current) titleRef.current.textContent = ch0.title
    if (subtitleRef.current) subtitleRef.current.textContent = ch0.subtitle
    if (bodyRef.current) bodyRef.current.textContent = ch0.body
    if (sigilRef.current) sigilRef.current.textContent = ch0.sigil

    return () => video.removeEventListener('loadedmetadata', onReady)
  }, [])

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    if (!videoReady) return

    const video = videoRef.current
    const duration = video.duration || 1
    const scrollHeight = window.innerHeight * 5.5

    let targetTime = 0
    let currentTime = 0

    // High performance ticker frame loop for hardware-smooth seeking
    const updateVideoSeek = () => {
      if (!video) return
      
      const diff = targetTime - currentTime
      
      // If we have scaled enough diff, slide the video playhead
      if (Math.abs(diff) > 0.001) {
        currentTime += diff * 0.12 // Lerping factor
        
        // Ensure currentTime stays in bounds of duration
        const boundedTime = Math.max(0, Math.min(duration - 0.02, currentTime))
        
        if (video.readyState >= 2) {
          video.currentTime = boundedTime
        }
      }
    }

    gsap.ticker.add(updateVideoSeek)

    // Pin viewport
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${scrollHeight}`,
      pin: stickyRef.current,
      pinSpacing: true,
      anticipatePin: 1,
    })

    // Main scrub timeline
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollHeight}`,
        scrub: 1.0,
        onUpdate: (self) => {
          // Set target time which is smoothly reached by the ticker loop
          targetTime = self.progress * duration

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
      background: 'linear-gradient(to top, rgba(5,4,3,0.95) 0%, rgba(5,4,3,0.2) 60%)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollHeight}`,
        scrub: 1.5,
      },
    })

    // Staggered entrance
    gsap.fromTo(
      [sigilRef.current, subtitleRef.current, titleRef.current, bodyRef.current],
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
      gsap.ticker.remove(updateVideoSeek)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [videoReady])

  return (
    <>
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 bg-[#050403] z-[999] flex flex-col items-center justify-center gap-6 transition-all duration-1000 ${
          videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="font-headings text-2xl md:text-3xl text-[#c9a84c] tracking-widest uppercase animate-pulse drop-shadow-[0_0_10px_rgba(201,168,76,0.3)]">
          MOHD WASIF
        </div>
        <div className="font-headings text-[10px] tracking-[0.3em] text-[#8a8070] uppercase">
          ASSEMBLING DIGITAL FLEET...
        </div>
        <div className="w-40 h-[1px] bg-[#c9a84c]/20 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-[#c9a84c] animate-load-fill w-full" />
        </div>
      </div>

      {/* Main Scroll Container */}
      <div
        ref={containerRef}
        className="relative w-full bg-black"
        style={{ height: `${window.innerHeight * 5.5 + window.innerHeight}px` }}
      >
        {/* Sticky Viewport Wrapper */}
        <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden bg-[#050403]">
          {/* Background Video */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/video/one.mp4"
            playsInline
            muted
            preload="auto"
          />

          {/* Vignette Layer */}
          <div
            ref={vignetteRef}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,4,3,0.9)_100%)] pointer-events-none z-10 transition-opacity duration-300"
          />

          {/* Overlay Gradient */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-t from-[#050403]/90 via-transparent to-transparent pointer-events-none z-10"
          />

          {/* Film Grain */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 bg-repeat bg-[size:180px] bg-[image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.9%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

          {/* Corner Ornaments */}
          {['top-6 left-6', 'top-6 right-6 scale-x-[-1]', 'bottom-6 left-6 scale-y-[-1]', 'bottom-6 right-6 scale-[-1]'].map(
            (pos, idx) => (
              <div key={idx} className={`absolute w-10 h-10 pointer-events-none z-20 ${pos}`}>
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
                  <path d="M2 2 L2 20 M2 2 L20 2" stroke="#c9a84c" strokeWidth="1" />
                  <path d="M2 2 L8 8" stroke="#c9a84c" strokeWidth="0.5" />
                  <rect x="1" y="1" width="4" height="4" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
                </svg>
              </div>
            )
          )}

          {/* Rune Bar */}
          <div ref={runeBarRef} className="absolute top-24 left-6 right-6 md:left-12 md:right-12 z-20 flex items-center h-[1px]">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className={`rune-tick flex-1 h-full bg-[#c9a84c]/20 transform-origin-bottom ${
                  i % 3 === 0 ? 'h-[4px] bg-[#c9a84c]/50' : i % 7 === 0 ? 'h-[2px]' : ''
                }`}
              />
            ))}
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-16 left-6 right-6 md:left-16 md:right-16 max-w-2xl z-20 select-text">
            {/* Sigil Symbol */}
            <span
              ref={sigilRef}
              className="font-headings text-2xl md:text-3xl text-[#c9a84c] drop-shadow-[0_0_12px_rgba(201,168,76,0.6)] mb-4 block"
            />
            
            {/* Gold Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/40 w-12" />
              <div className="w-1.5 h-1.5 bg-[#c9a84c] rotate-45 shadow-[0_0_5px_#c9a84c]" />
              <div className="h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/40 w-12" />
            </div>

            {/* Subtitle */}
            <span
              ref={subtitleRef}
              className="font-headings text-[10px] md:text-xs tracking-[0.4em] text-[#c9a84c] uppercase mb-4 block"
            />

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-headings text-3xl md:text-6xl font-black text-[#f5e6c8] leading-[1.1] uppercase mb-5 tracking-wider drop-shadow-lg"
            />

            {/* Description */}
            <p
              ref={bodyRef}
              className="font-body text-xs md:text-sm text-[#8a8070] max-w-lg leading-relaxed italic mb-8"
            />

          </div>

          {/* Centre CTAs over the video, independent from the bottom text panel */}
          <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 whitespace-nowrap sm:flex-row">
            <a
              href="/projects"
              className="px-6 py-3 rounded-sm bg-gradient-to-r from-[#c9a84c] to-[#d4af37] text-[#050403] font-headings font-bold text-[10px] tracking-[0.2em] uppercase hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              View The Armory
            </a>
            <a
              href="/contact"
              className="px-6 py-3 rounded-sm border border-[#c9a84c]/40 bg-[#050403]/50 text-[#f5e6c8] font-headings font-bold text-[10px] tracking-[0.2em] uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-all duration-300 backdrop-blur-sm"
            >
              Summon The Lord
            </a>
          </div>

          {/* Right Indicator Panel */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6">
            <div ref={chapterLabelRef} className="font-headings text-[10px] tracking-[0.2em] text-[#c9a84c]/50 writing-vertical select-none">
              01 / 06
            </div>
            <div className="w-[1px] h-16 bg-gradient-to-b from-[#c9a84c]/40 to-transparent" />
            <div className="flex flex-col gap-2.5">
              {CHAPTERS.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 transform rotate-45 transition-all duration-300 ${
                    i === activeChapter ? 'bg-[#c9a84c] scale-150 shadow-[0_0_8px_#c9a84c]' : 'bg-[#c9a84c]/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a84c]/10 z-20">
            <div ref={progressRef} className="h-full bg-[#c9a84c] shadow-[0_0_10px_#c9a84c] w-0 transition-all duration-75" />
          </div>
        </div>
      </div>
    </>
  )
}
