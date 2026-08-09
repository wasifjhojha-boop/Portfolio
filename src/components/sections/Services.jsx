import { useEffect, useRef, useState } from 'react'
import {
  FaSearch,
  FaGoogle,
  FaFacebook,
  FaCode,
  FaChartLine,
  FaBullseye,
  FaArrowRight,
  FaTimes,
} from 'react-icons/fa'
import './Services.css'
import MarqueeAlongSvgPath from '../ui/marquee-along-svg-path'

const SERVICES = [
  {
    id: 'seo',
    icon: FaSearch,
    name: 'SEO MASTERY',
    seat: 'Google Search Console',
    words: '"Rank Higher. Grow Organically."',
    region: 'Organic Discovery',
    sigil: 'Technical Audits & Backlinks',
    accent: '#8fafc4',
    description:
      'Audit crawl paths, schema structures, speed bottlenecks, and build semantic keyword clusters to steer organic visitors straight to your site.',
    borderColor: '#8fafc4',
  },
  {
    id: 'google-ads',
    icon: FaGoogle,
    name: 'GOOGLE ADS',
    seat: 'ROAS Performance Max',
    words: '"Search. Strike. Convert."',
    region: 'Paid Acquisition',
    sigil: 'Intent-Driven Ad Campaigns',
    accent: '#d4a84b',
    description:
      'Search campaigns, Display, and Shopping setups built around maximum conversion. A/B landing copy and negative keyword targeting with surgical precision.',
    borderColor: '#d4a84b',
  },
  {
    id: 'meta-ads',
    icon: FaFacebook,
    name: 'META ADS',
    seat: 'Facebook & Instagram',
    words: '"Reach. Retarget. Convert."',
    region: 'Paid Acquisition',
    sigil: 'Funnel Retargeting & Creative',
    accent: '#4267b2',
    description:
      'Dynamic visual setups targeting demographics with precision. Retargeting funnels, custom pixel telemetry, and creative strategies that scale budget into revenue.',
    borderColor: '#4267b2',
  },
  {
    id: 'web-dev',
    icon: FaCode,
    name: 'WEB DEVELOPMENT',
    seat: 'React • Next.js • WP',
    words: '"Built For Speed."',
    region: 'Frontend Engineering',
    sigil: 'High-Performance Clean Code',
    accent: '#a07d33',
    description:
      'Fast, modern, and SEO-compliant websites. Custom themes, Gutenberg blocks, and Single Page Apps built for rapid loads and clean architecture.',
    borderColor: '#a07d33',
  },
  {
    id: 'performance-marketing',
    icon: FaChartLine,
    name: 'PERFORMANCE MARKETING',
    seat: 'Full Funnel Media Buying',
    words: '"Every Click Counts."',
    region: 'Growth Strategy',
    sigil: 'Cross-Network Data Attribution',
    accent: '#5a8ba0',
    description:
      'Multi-channel growth strategies syncing Paid Ads, Technical SEO, and conversion trackers into a single, high-performing lead generation engine.',
    borderColor: '#5a8ba0',
  },
  {
    id: 'landing-pages',
    icon: FaBullseye,
    name: 'LANDING PAGES',
    seat: 'UX & CRO Optimizations',
    words: '"Built To Convert."',
    region: 'Conversion Strategy',
    sigil: 'Wireframing & Copywriting',
    accent: '#5a9e48',
    description:
      'Highly persuasive layouts designed specifically for ad landing zones. Optimizing user flows, CTAs, and load speeds to squeeze value out of clicks.',
    borderColor: '#5a9e48',
  },
]

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null)
  const sigilRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const Icon = service.icon
  const contentId = `service-detail-${service.id}`

  // Staggered entrance via IntersectionObserver
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 120)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  // Icon tilt on hover
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14
    if (sigilRef.current) {
      sigilRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.06)`
    }
  }

  const resetTilt = () => {
    if (sigilRef.current) sigilRef.current.style.transform = ''
  }

  // A single `hovered` state now opens via mouse hover (desktop), tap/click
  // (touch — synthetic hover events on touch devices are unreliable), and
  // keyboard focus (motor/screen-reader users who can't hover at all).
  const openCard = () => setHovered(true)
  const closeCard = () => {
    setHovered(false)
    resetTilt()
  }

  // Only close on blur once focus has actually left the card (not when it
  // moves from the card onto the CTA link or close button inside it).
  const handleBlur = (e) => {
    if (!cardRef.current?.contains(e.relatedTarget)) closeCard()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeCard()
      cardRef.current?.blur()
    }
  }

  return (
    <div
      id={service.id}
      ref={cardRef}
      className={`house-card house-card--${service.id}`}
      style={{
        '--accent': service.accent,
        '--border': service.borderColor,
      }}
      tabIndex={0}
      role="group"
      aria-label={`${service.name} — ${service.sigil}`}
      aria-expanded={hovered}
      onMouseEnter={openCard}
      onMouseLeave={closeCard}
      onMouseMove={handleMouseMove}
      onFocus={openCard}
      onBlur={handleBlur}
      onClick={openCard}
      onKeyDown={handleKeyDown}
    >
      {/* Corner ornaments */}
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      {/* Glow pulse on hover */}
      <div className="card-glow" />

      {/* Service icon */}
      <div ref={sigilRef} className="house-sigil-wrap" aria-hidden="true">
        <div className="house-icon-circle">
          <Icon size={38} />
        </div>
        <div className="sigil-ring" />
      </div>

      {/* Static Front Content */}
      <div className={`house-content ${hovered ? 'content-hidden' : ''}`}>
        <p className="house-region">{service.region}</p>
        <div className="house-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h2 className="house-name">{service.name}</h2>
        <p className="house-seat">{service.seat}</p>
        <p className="house-sigil-label">{service.sigil}</p>
        <p className="house-hint">View Details</p>
      </div>

      {/* Hover / Tap / Focus Reveal Content */}
      <div
        id={contentId}
        className={`house-hover-content ${hovered ? 'hover-visible' : ''}`}
      >
        <button
          type="button"
          className="house-close-btn"
          tabIndex={hovered ? 0 : -1}
          aria-label={`Close ${service.name} details`}
          onClick={(e) => {
            e.stopPropagation()
            closeCard()
          }}
        >
          <FaTimes size={11} />
        </button>
        <p className="hover-words">{service.words}</p>
        <div className="house-divider hover-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <p className="hover-name">{service.name}</p>
        <p className="hover-desc">{service.description}</p>
        <a
          href={`/contact?service=${encodeURIComponent(service.name)}`}
          className="hover-cta"
          tabIndex={hovered ? 0 : -1}
          onClick={(e) => e.stopPropagation()}
        >
          Discuss This Service <FaArrowRight size={10} />
        </a>
      </div>

      {/* Bottom accent bar */}
      <div className="card-accent-bar" />
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const els = [headingRef.current, subRef.current].filter(Boolean)
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          els.forEach((el, i) =>
            setTimeout(() => el.classList.add('visible'), i * 150)
          )
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Service structured data (schema.org). /services is a standalone route,
  // so this is the one place on the site where an ItemList of Services
  // belongs — it lets Google surface individual services (SEO, Google Ads,
  // web dev, etc.) as rich results instead of one opaque page.
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: SERVICES.map((service, i) => ({
        '@type': 'Service',
        position: i + 1,
        name: service.name,
        description: service.description,
        url: `https://www.wasif.world/services#${service.id}`,
        provider: {
          '@type': 'Person',
          name: 'Mohd Wasif',
          url: 'https://www.wasif.world',
        },
        areaServed: 'Worldwide',
      })),
    })
    document.head.appendChild(script)
    return () => document.head.removeChild(script)
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative w-full py-24 bg-[#ffffff] overflow-hidden">
      {/* Ambient background texture */}
      <div className="absolute inset-0 opacity-[0.045] pointer-events-none bg-repeat bg-[size:220px] bg-[image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_300_300%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-16">
          <p ref={subRef} className="eyebrow text-[#a07d33] mb-4 opacity-0 translate-y-7 transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            WHAT I DO
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#a07d33]/50" />
            <span className="w-1 h-1 rounded-full bg-[#a07d33]/60" />
            <span className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#a07d33]/50" />
          </div>
          <h1 ref={headingRef} className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase mb-4 opacity-0 translate-y-7 transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Services <em>Rendered</em>
          </h1>
          <p className="font-body text-xs md:text-sm text-[#5f594c] italic tracking-wide max-w-md mx-auto mt-4">
            Six distinct specialties. Built for conversions, scaled for reach, and optimized for search.
          </p>
        </header>

        {/* Services Grid */}
        <div className="houses-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Service icons riding a wave path — decorative rhythm between the
            grid and the closing CTA. */}
        <div className="mt-16 h-24 md:h-28">
          <MarqueeAlongSvgPath
            path="M1 60 C 150 10, 250 110, 400 60 S 650 10, 799 60"
            viewBox="0 0 800 120"
            baseVelocity={3}
            slowdownOnHover
            responsive
            className="w-full h-full text-[#a07d33]/15"
          >
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="w-11 h-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f5f0] border flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(28,23,16,0.25)]"
                style={{ borderColor: `${service.accent}55`, color: service.accent }}
              >
                <service.icon size={16} />
              </div>
            ))}
          </MarqueeAlongSvgPath>
        </div>

        {/* Closing CTA — every service card leads here if nothing else does */}
        <div className="mt-12 text-center">
          <p className="font-body text-sm md:text-base text-[#5f594c] italic max-w-lg mx-auto mb-7">
            Not sure which service fits your goals? Let's map it out together — no obligation.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#a07d33] text-[#ffffff] font-label text-[11px] font-semibold tracking-[0.25em] uppercase rounded-sm hover:bg-[#8c6a28] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_20px_-8px_rgba(160,125,51,0.5)]"
          >
            Book A Free Consultation
            <FaArrowRight size={11} />
          </a>
        </div>

        {/* Section Footer Ornament */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-[#a07d33]/30" />
          <span className="w-1 h-1 rounded-full bg-[#a07d33]/40 inline-block" />
          <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-[#a07d33]/30" />
        </div>
      </div>
    </section>
  )
}
