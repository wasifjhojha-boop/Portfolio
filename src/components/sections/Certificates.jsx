import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaStamp } from 'react-icons/fa'
import { LiquidButton, LiquidGlassFilter } from '../ui/liquid-glass-button'
import { certificates } from '../../content/certificates'

export default function Certificates() {
  const railRef = useRef(null)
  const cardRefs = useRef([])
  const [active, setActive] = useState(0)

  // Track which card is nearest the rail's left edge, so the dots and
  // arrow disabled-states reflect native scroll/snap/drag — not just
  // clicks made through the arrows themselves.
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    let ticking = false
    const update = () => {
      ticking = false

      // Trailing cards can run out of room to ever reach the rail's left
      // edge (the rail can't scroll past its max), so a pure "closest to
      // left edge" measurement can never select them. Once scrolled to (or
      // within a px of) the end, the last card is the active one.
      const maxScroll = rail.scrollWidth - rail.clientWidth
      if (maxScroll > 0 && rail.scrollLeft >= maxScroll - 1) {
        setActive(certificates.length - 1)
        return
      }

      const railLeft = rail.getBoundingClientRect().left
      let closest = 0
      let closestDist = Infinity
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const dist = Math.abs(card.getBoundingClientRect().left - railLeft)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActive(closest)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    rail.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      rail.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(certificates.length - 1, i))
    if (clamped === certificates.length - 1) {
      // Scroll to true max rather than the card's own edge: scrollIntoView
      // stops the moment the card enters view, which can leave the rail
      // short of its actual end and the last card never counted "active".
      railRef.current?.scrollTo({
        left: railRef.current.scrollWidth - railRef.current.clientWidth,
        behavior: 'smooth',
      })
      return
    }
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    })
  }

  return (
    <section id="certificates" className="relative w-full py-24 bg-(--card) border-t border-(--accent)/10 overflow-hidden ambient-ocean">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />
      <LiquidGlassFilter />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="eyebrow text-(--accent) mb-4">
            VERIFIED CREDENTIALS
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-(--accent)/50" />
            <span className="w-1 h-1 rounded-full bg-(--accent)/60" />
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-(--accent)/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase">
            Certificates
          </h2>
        </div>

        {/* Horizontal snap rail. tabindex + role make the scroll region
            reachable and operable by keyboard, which a plain overflow
            container is not. */}
        <div
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label="Certificates — horizontally scrollable list"
          className="no-scrollbar -mx-6 md:-mx-12 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-6 md:px-12 pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
        >
          {certificates.map((cert, idx) => {
            const link = cert.verifyUrl || cert.file || cert.image
            return (
              <motion.div
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                className="card-lift p-8 rounded-sm flex flex-col relative overflow-hidden group shadow-lg bg-(--background) border border-(--accent)/10 w-[78vw] sm:w-[22rem] shrink-0 snap-start"
              >
                {cert.image ? (
                  <div className="w-full aspect-[4/3] mb-6 rounded-sm overflow-hidden border border-(--accent)/20 bg-(--card)">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      decoding="async"
                      className="w-full h-full object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full border border-(--accent)/40 bg-(--accent)/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                    <FaStamp size={24} className="text-(--accent)" />
                  </div>
                )}

                {/* Title & Issuer */}
                <div className="mb-4">
                  <h3 className="font-headings text-lg font-bold text-(--foreground) tracking-wide leading-tight group-hover:text-(--accent) transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-(--muted) text-[9px] font-label tracking-[0.2em] uppercase mt-3">
                    {cert.issuer}{cert.date ? ` • ${cert.date}` : ''}
                  </p>
                  {cert.credentialId && (
                    <p className="text-(--muted) text-[9px] font-body mt-1">Credential ID: {cert.credentialId}</p>
                  )}
                </div>

                {/* View Credentials Anchor */}
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto flex items-center gap-2 text-(--muted) hover:text-(--foreground) text-[10px] font-semibold font-label tracking-[0.2em] uppercase transition-colors"
                  >
                    <span>View Credential</span>
                    <FaExternalLinkAlt size={10} />
                  </a>
                ) : null}

                {/* Top border trim */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-(--accent) opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
        </div>

        {/* Controls: arrows scroll one card at a time; dots jump directly
            and reflect scroll position set by drag/keyboard/wheel too. */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <LiquidButton
            size="icon"
            aria-label="Previous certificate"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
          >
            <FaChevronLeft size={13} />
          </LiquidButton>

          <div className="flex items-center gap-2 flex-wrap justify-center max-w-xs" role="tablist" aria-label="Certificate pages">
            {certificates.map((cert, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to ${cert.title}`}
                aria-selected={i === active}
                role="tab"
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-7 bg-(--accent)' : 'w-1.5 bg-(--accent)/25 hover:bg-(--accent)/50'
                }`}
              />
            ))}
          </div>

          <LiquidButton
            size="icon"
            aria-label="Next certificate"
            disabled={active === certificates.length - 1}
            onClick={() => goTo(active + 1)}
          >
            <FaChevronRight size={13} />
          </LiquidButton>
        </div>
      </div>
    </section>
  )
}
