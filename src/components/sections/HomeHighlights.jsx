import { useEffect, useRef, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { projects } from '../../content/projects'
import { contact } from '../../content/contact'

// Real campaign figures from the Muqeem & Brothers case study, plus career
// totals. Hard numbers are the strongest proof a performance marketer can
// lead with. "Websites Delivered" stays last as the closing figure.
const METRICS = [
  { to: 1.94, decimals: 2, suffix: 'M', label: 'Ad Impressions Served' },
  { to: 73.5, decimals: 1, suffix: 'K', label: 'Video Views Driven' },
  { to: 74, suffix: 'K', label: 'Meta Campaign Reach' },
  { to: 6.6, decimals: 1, suffix: 'K', label: 'Paid Clicks Delivered' },
  { to: 18.71, decimals: 2, prefix: '₹', label: 'Lowest Cost Per Click' },
  { to: 5, suffix: '+', label: 'Years of Experience' },
  { to: 25, suffix: '+', label: 'Client Testimonials' },
  { to: 20, suffix: '+', label: 'Websites Delivered' },
]

// Fires once the element scrolls into view. Deliberately uses
// IntersectionObserver rather than a rAF poll: browsers pause rAF entirely in
// backgrounded/occluded tabs, and anything gated on a paused loop would stay
// invisible. IntersectionObserver still delivers callbacks in that state.
function useRevealed(ref, margin = '-100px') {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || revealed) return

    // Already on screen at mount (e.g. short pages, restored scroll position).
    const { top, bottom } = el.getBoundingClientRect()
    if (top < window.innerHeight && bottom > 0) {
      setRevealed(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { rootMargin: `0px 0px ${margin} 0px` }
    )
    obs.observe(el)

    // Guarantee the content appears. Observer callbacks are delivered on the
    // rendering pipeline, which browsers halt in backgrounded tabs — without
    // this, a page opened in a background tab could show empty stat tiles.
    // Timers keep running there, so reveal unconditionally after a delay.
    const guard = setTimeout(() => setRevealed(true), 2500)

    return () => {
      obs.disconnect()
      clearTimeout(guard)
    }
  }, [ref, margin, revealed])

  return revealed
}

// Counts up once its strip is revealed. Honours prefers-reduced-motion by
// rendering the final figure immediately.
function Counter({ active, to, decimals = 0, prefix = '', suffix = '', duration = 1600 }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to)
      return
    }

    let rafId
    let done = false
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      // easeOutCubic — fast start, gentle settle
      setN(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) rafId = requestAnimationFrame(tick)
      else done = true
    }
    rafId = requestAnimationFrame(tick)

    // Safety net: rAF is paused in backgrounded tabs, which would otherwise
    // leave a real figure frozen at zero. Timers still fire there, so snap to
    // the true value if the animation never completed.
    const guard = setTimeout(() => {
      if (!done) setN(to)
    }, duration + 400)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(guard)
    }
  }, [active, to, duration])

  return (
    <>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </>
  )
}

// The three fully-documented case studies lead the home page.
const FEATURED = projects.filter((p) => p.status === 'detailed').slice(0, 3)

// Reveal via CSS transition rather than a JS animation library: JS-driven
// animation needs rAF, which backgrounded tabs pause, and anything left at
// its initial opacity would be invisible. A CSS transition still settles on
// the final computed style. Matches the pattern in ShipScene/Services.
const REVEAL = 'transition-all duration-500 ease-out'
const shown = (on) => (on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7')

export default function HomeHighlights() {
  const metricsRef = useRef(null)
  const workRef = useRef(null)
  const metricsIn = useRevealed(metricsRef)
  const workIn = useRevealed(workRef)

  return (
    <>
      {/* ── Proof strip ── */}
      <section
        ref={metricsRef}
        aria-label="Results at a glance"
        className="relative w-full bg-[#ffffff] border-t border-[#a07d33]/10 py-20 md:py-24 ambient-ocean overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-14">
            <p className="eyebrow text-[#a07d33] mb-4">Proof In The Numbers</p>
            <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-gold-gradient uppercase">
              Measurable Results
            </h2>
          </div>

          {/* Tiles carry no opacity gate on purpose: the count-up is the
              animation, and a figure that can never be hidden is worth more
              than a fade. */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-headings text-3xl md:text-[2.75rem] font-extrabold text-[#a07d33] leading-none tabular-nums drop-shadow-[0_2px_12px_rgba(160,125,51,0.25)]">
                  <Counter active={metricsIn} to={m.to} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <p className="font-label text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#5f594c] mt-3 leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      <section
        ref={workRef}
        aria-label="Selected work"
        className="relative w-full bg-[#ffffff] border-t border-[#a07d33]/10 py-20 md:py-24 ambient-ocean overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-14 md:mb-16">
            <p className="eyebrow text-[#a07d33] mb-4">Selected Work</p>
            <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-gold-gradient uppercase">
              Selected Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURED.map((p, i) => (
              <article
                key={p.id}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`glass-panel card-lift rounded-sm overflow-hidden flex flex-col ${REVEAL} ${shown(workIn)}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f7f5f0]">
                  {/* Not lazy-loaded: native lazy loading does not reliably
                      trigger inside the GSAP-pinned page flow, leaving the
                      cards blank. Only three small images, so eager is fine. */}
                  <img
                    src={p.image}
                    alt={p.title}
                    decoding="async"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#ffffff]/80 backdrop-blur-sm text-[8px] font-label font-semibold tracking-[0.2em] uppercase text-[#a07d33] rounded-sm">
                    {p.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-headings text-base font-bold tracking-wide text-[#191712] leading-snug mb-3">
                    {p.title}
                  </h3>
                  <p className="font-body text-xs text-[#5f594c] leading-relaxed mb-5 flex-1">
                    {p.story?.[0]?.slice(0, 130)}…
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[8px] font-label tracking-[0.15em] uppercase text-[#5f594c] border border-[#a07d33]/15 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/projects"
              className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#a07d33]/40 text-[#191712] font-label font-semibold text-[10px] tracking-[0.22em] uppercase hover:bg-[#a07d33]/10 hover:border-[#a07d33] hover:text-[#a07d33] transition-all duration-300 rounded-sm"
            >
              View All Projects
              <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section
        aria-label="Start a project"
        className="relative w-full bg-[#ffffff] border-t border-[#a07d33]/10 py-24 md:py-28 ambient-ocean overflow-hidden"
      >
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="eyebrow text-[#a07d33] mb-5">Drop Anchor</p>
          <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-gold-gradient uppercase mb-6">
            Let&apos;s Build Something
          </h2>
          <p className="font-body text-sm md:text-base text-[#5f594c] leading-relaxed mb-10">
            Whether you need campaigns that convert, a site that ranks, or a build that does both —
            I&apos;d like to hear what you&apos;re working on.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 rounded-sm bg-gradient-to-br from-[#e8c97a] via-[#a07d33] to-[#b8862a] text-[#ffffff] font-label font-semibold text-[10px] tracking-[0.22em] uppercase shadow-[0_8px_24px_-8px_rgba(160,125,51,0.6)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(160,125,51,0.7)] transition-all duration-300"
            >
              Start a Project
            </a>
            <a
              href={contact.resume}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-sm border border-[#a07d33]/40 text-[#191712] font-label font-semibold text-[10px] tracking-[0.22em] uppercase hover:bg-[#a07d33]/10 hover:border-[#a07d33] hover:text-[#a07d33] hover:-translate-y-0.5 transition-all duration-300"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
