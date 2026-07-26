import { useState } from 'react'
import './ElectricCard.css'

/**
 * Portrait card with a crackling electric border, driven by an animated SVG
 * turbulence filter. Deliberately plain — no eyebrow, title, copy or button —
 * so it reads as a visual rather than repeating the surrounding section.
 *
 * The photo crossfades from the real headshot to the illustrated portrait on
 * hover, and on tap for touch devices where hover does not exist.
 */
export default function ElectricCard({
  real = '/about/wasif-real.jpg',
  art = '/about/wasif-art.jpg',
  alt = 'Mohd Wasif',
  className = '',
}) {
  const [swapped, setSwapped] = useState(false)

  return (
    <div
      className={`ecard ${className}`}
      data-swapped={swapped}
      onClick={() => setSwapped((s) => !s)}
    >
      {/* Filter host — invisible, but must be in the DOM for the border effect */}
      <svg className="ecard__filter-host" aria-hidden="true">
        <filter id="ecard-turbulent-displace" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.05"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            <animate attributeName="seed" values="1;30;1" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="ecard__inner">
        <div className="ecard__border-outer">
          <div className="ecard__surface" />
        </div>

        <div className="ecard__glow-1" />
        <div className="ecard__glow-2" />
        <div className="ecard__overlay-1" />
        <div className="ecard__overlay-2" />
        <div className="ecard__bg-glow" />

        <div className="ecard__photos">
          <img
            className="ecard__photo ecard__photo--real"
            src={real}
            alt={alt}
            width="700"
            height="1000"
            decoding="async"
          />
          <img
            className="ecard__photo ecard__photo--art"
            src={art}
            alt=""
            aria-hidden="true"
            width="700"
            height="1000"
            decoding="async"
          />
        </div>
      </div>
    </div>
  )
}
