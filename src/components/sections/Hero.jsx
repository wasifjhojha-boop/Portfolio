import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import CharacterScene from '../three/CharacterScene'
import { contact } from '../../content/contact'

// Developer-first ordering: engineering leads, growth work supports it.
const ROLES = ['Full-Stack Developer', 'React & Next.js', 'Three.js & WebGL', 'Technical SEO']

gsap.registerPlugin(ScrollTrigger)

// Scroll showcase: slides 0-1 are the 3D models (inside the canvas), then
// photos. The standing portrait was dropped — model 1 already shows that pose.
const PHOTOS = ['/hero/wasif-2.jpg']
const SLIDE_COUNT = 2 + PHOTOS.length

const SOCIALS = [
  { icon: FaGithub, label: 'GitHub', href: contact.github, external: true },
  { icon: FaLinkedin, label: 'LinkedIn', href: contact.linkedin, external: true },
  { icon: FaEnvelope, label: 'Email', href: `mailto:${contact.email}` },
]

// Button that leans toward the cursor (magnetic hover). Falls back to a
// plain link when reduced motion is preferred.
function MagneticLink({ href, className, children, reducedMotion }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (reducedMotion || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2)
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2)
    ref.current.style.transform = `translate(${x * 5}px, ${y * 5}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </a>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const wrapRef = useRef(null)
  const introRef = useRef(null)
  const giantRef = useRef(null)
  const canvasWrapRef = useRef(null)
  // Normalized mouse position (-0.5..0.5), shared with the 3D scene
  const mouse = useRef({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [slide, setSlide] = useState(0)

  // Scroll-driven showcase: GSAP pins the hero while the outer wrapper
  // scrolls, and progress picks the active slide. (position: sticky breaks
  // under the app root's overflow-x-hidden, so ScrollTrigger pinning —
  // already proven in this layout — is used instead.)
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: sectionRef.current,
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(SLIDE_COUNT - 1, Math.floor(self.progress * SLIDE_COUNT))
        setSlide((s) => (s === idx ? s : idx))
      },
    })
    return () => trigger.kill()
  }, [])

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Mouse-driven parallax: giant text + character drift very slightly
  useEffect(() => {
    if (reducedMotion) return
    let rafId
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5
      mouse.current.y = e.clientY / window.innerHeight - 0.5
    }
    const tick = () => {
      const { x, y } = mouse.current
      if (giantRef.current) {
        giantRef.current.style.transform = `translate(${x * -22}px, ${y * -12}px)`
      }
      if (canvasWrapRef.current) {
        canvasWrapRef.current.style.transform = `translate(${x * 10}px, ${y * 6}px)`
      }
      rafId = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  // GSAP entrance: staggered reveal of the intro column
  useEffect(() => {
    if (!introRef.current) return
    const items = introRef.current.querySelectorAll('[data-reveal]')
    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }
    const tl = gsap.fromTo(
      items,
      { y: 34, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.15 }
    )
    return () => tl.kill()
  }, [reducedMotion])

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: `${SLIDE_COUNT * 100}vh` }}>
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative w-full h-screen overflow-hidden bg-[#f6f1e6]"
    >
      {/* ── Bright layered background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft white gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_28%_18%,rgba(255,255,255,0.95),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_78%_82%,rgba(160,125,51,0.14),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_85%_15%,rgba(220,232,245,0.55),transparent_70%)]" />

        {/* Floating light blobs */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full bg-[#ffffff] opacity-60 blur-[110px]"
          animate={reducedMotion ? {} : { y: [0, 34, 0], x: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[-8rem] right-[-6rem] w-[30rem] h-[30rem] rounded-full bg-[#e8c97a] opacity-25 blur-[120px]"
          animate={reducedMotion ? {} : { y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute top-1/3 right-1/4 w-[18rem] h-[18rem] rounded-full bg-[#cfe0f2] opacity-35 blur-[90px]"
          animate={reducedMotion ? {} : { y: [0, 26, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Gentle floating particles */}
        {!reducedMotion &&
          [...Array(9)].map((_, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute w-1 h-1 rounded-full bg-[#a07d33]/30"
              style={{ left: `${8 + i * 10.5}%`, top: `${18 + ((i * 29) % 60)}%` }}
              animate={{ y: [0, -22, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 7 + (i % 4) * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
            />
          ))}

        {/* Animated grain */}
        <div className="grain-overlay absolute inset-0 opacity-[0.05]" />
      </div>

      {/* ── Giant background typography ── */}
      <div
        ref={giantRef}
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none will-change-transform"
      >
        <span
          className="font-label font-semibold uppercase leading-[0.83] tracking-[-0.02em] text-[#1c1710] opacity-[0.055] whitespace-nowrap"
          style={{ fontSize: 'clamp(5rem, 17vw, 19rem)' }}
        >
          Web
        </span>
        <span
          className="font-label font-semibold uppercase leading-[0.83] tracking-[-0.02em] text-[#1c1710] opacity-[0.055] whitespace-nowrap"
          style={{ fontSize: 'clamp(5rem, 17vw, 19rem)' }}
        >
          Developer
        </span>
      </div>

      {/* ── Content grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center min-h-screen gap-6 pt-28 pb-16 lg:pt-24 lg:pb-0">
        {/* Left: intro */}
        <div ref={introRef} className="max-w-xl order-2 lg:order-1">
          <p data-reveal className="eyebrow text-[#a07d33] mb-5 opacity-0">
            Web Developer
          </p>

          <h1
            data-reveal
            className="font-headings font-black text-[#1c1710] leading-[1.02] mb-5 opacity-0"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.6rem)' }}
          >
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#b8862a] via-[#a07d33] to-[#a07d33]">Wasif</span>.
          </h1>

          {/* Roles */}
          <p data-reveal className="font-label text-[13px] md:text-sm tracking-[0.14em] uppercase text-[#6b6350] mb-6 opacity-0">
            {ROLES.map((role, i) => (
              <span key={role}>
                {role}
                {i < ROLES.length - 1 && <span className="text-[#a07d33] mx-2.5">·</span>}
              </span>
            ))}
          </p>

          <p data-reveal className="font-body text-base md:text-lg text-[#4a4335] leading-relaxed mb-9 opacity-0">
            I build fast, accessible web applications with React, Next.js, and WordPress —
            and because I came up through performance marketing, I build them to rank and
            convert, not just to render.
          </p>

          {/* CTAs — glass, magnetic */}
          <div data-reveal className="flex flex-col sm:flex-row items-start gap-4 mb-10 opacity-0">
            <MagneticLink
              href="/projects"
              reducedMotion={reducedMotion}
              className="px-8 py-4 rounded-full bg-gradient-to-br from-[#e8c97a] via-[#a07d33] to-[#b8862a] text-[#ffffff] font-label font-semibold text-[11px] tracking-[0.22em] uppercase shadow-[0_10px_30px_-8px_rgba(180,134,42,0.55)] hover:shadow-[0_16px_40px_-8px_rgba(180,134,42,0.65)] hover:-translate-y-0.5 duration-300"
            >
              Explore My Work
            </MagneticLink>
            <MagneticLink
              href="/contact"
              reducedMotion={reducedMotion}
              className="px-8 py-4 rounded-full border border-[#a07d33]/35 bg-white/40 backdrop-blur-md text-[#3f3a2e] font-label font-semibold text-[11px] tracking-[0.22em] uppercase shadow-[0_8px_24px_-12px_rgba(28,23,16,0.25)] hover:border-[#a07d33] hover:bg-white/60 hover:text-[#a07d33] hover:-translate-y-0.5 duration-300"
            >
              Contact Me
            </MagneticLink>
          </div>

          {/* Socials */}
          <div data-reveal className="flex items-center gap-3 opacity-0">
            {SOCIALS.map(({ icon: Icon, label, href, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                aria-label={label}
                title={label}
                whileHover={reducedMotion ? {} : { y: -4, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                className="w-11 h-11 rounded-full border border-[#a07d33]/30 bg-white/50 backdrop-blur-md flex items-center justify-center text-[#6b6350] hover:text-[#a07d33] hover:border-[#a07d33]/70 shadow-[0_6px_18px_-10px_rgba(28,23,16,0.3)] transition-colors duration-300"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: scroll showcase — 3D models, then photos (~70% hero height) */}
        <div className="relative order-1 lg:order-2 flex items-center justify-center">
          <div
            ref={canvasWrapRef}
            className="relative w-full h-[52vh] sm:h-[58vh] lg:h-[70vh] will-change-transform"
            aria-hidden="true"
          >
            {/* 3D models (slides 0-1) */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                slide < 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <CharacterScene mouse={mouse} slide={slide} reducedMotion={reducedMotion} />
            </div>

            {/* Photos (slides 2+) */}
            {PHOTOS.map((src, i) => {
              const active = slide === i + 2
              return (
                <div
                  key={src}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                    active ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    decoding="async"
                    className="max-h-full w-auto max-w-full rounded-3xl object-contain object-top ring-1 ring-[#a07d33]/25 shadow-[0_30px_80px_-25px_rgba(28,23,16,0.45)]"
                  />
                </div>
              )
            })}
          </div>

          {/* Slide dots */}
          <div className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === slide ? 'bg-[#a07d33] scale-150' : 'bg-[#a07d33]/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-6 h-10 rounded-full border-2 border-[#a07d33]/40 flex justify-center pt-2 bg-white/30 backdrop-blur-sm">
          <div className="w-1 h-2 rounded-full bg-[#a07d33] animate-scroll-dot" />
        </div>
        <span className="font-label text-[9px] tracking-[0.3em] text-[#6b6350] uppercase">Scroll</span>
      </div>
    </section>
    </div>
  )
}
