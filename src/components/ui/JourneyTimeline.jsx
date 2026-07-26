import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Vertical timeline whose connecting rule fills as you scroll through it,
 * with entries alternating either side of the rule on large screens.
 *
 * The fill is driven by ScrollTrigger rather than a scroll listener or a
 * standalone rAF loop: App.jsx already pipes Lenis into ScrollTrigger, so
 * this shares that one loop instead of adding another that Lenis's
 * transform-based scrolling would not reliably feed.
 */
export default function JourneyTimeline({ items = [] }) {
  const listRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fill.style.transform = 'scaleY(1)'
      return
    }

    fill.style.transform = 'scaleY(0)'
    const trigger = ScrollTrigger.create({
      trigger: list,
      start: 'top 85%',
      end: 'bottom 65%',
      onUpdate: (self) => {
        fill.style.transform = `scaleY(${self.progress})`
      },
    })

    // ScrollTrigger measures on creation; if fonts or images settle after
    // that, the start/end offsets drift. One refresh once idle fixes it.
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)

    return () => {
      clearTimeout(t)
      trigger.kill()
    }
  }, [items.length])

  return (
    <div className="relative mt-14 md:mt-20">
      {/* Rule spans the list only, so the fill cannot complete early on
          surrounding whitespace. */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[7px] w-px -translate-x-1/2 bg-[#e4e0d6] lg:left-1/2"
      >
        <div
          ref={fillRef}
          className="h-full w-px origin-top bg-gradient-to-b from-[#a07d33] to-[#c9a86a]"
        />
      </div>

      <ol ref={listRef} className="space-y-12 sm:space-y-16">
        {items.map((stage, i) => {
          const rightSide = i % 2 === 1
          return (
            <li
              key={stage.id}
              className="relative pl-10 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-[6px] z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full border border-[#d8d2c4] bg-white lg:left-1/2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#a07d33]" />
              </span>

              <div
                className={
                  rightSide
                    ? 'lg:col-start-2 lg:row-start-1 lg:pl-4'
                    : 'lg:col-start-1 lg:row-start-1 lg:pr-4 lg:text-right'
                }
              >
                <span className="font-label text-[10px] tracking-[0.28em] text-[#a07d33]/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-headings mt-2.5 text-base sm:text-lg font-semibold tracking-tight text-[#191712]">
                  {stage.label}
                </h4>
                <p
                  className={`font-body mt-2 max-w-[52ch] text-sm leading-relaxed text-[#5f594c] ${
                    rightSide ? '' : 'lg:ml-auto'
                  }`}
                >
                  {stage.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
