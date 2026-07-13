import { useEffect, useRef, useState } from 'react'
import './Services.css'

const SERVICES = [
  {
    id: 'stark',
    name: 'SEO MASTERY',
    seat: 'Google Search Console',
    words: '"Rank Top. Grow Organically."',
    region: 'Organic Discovery',
    sigil: 'Technical Audits & Backlinks',
    colors: ['#6b7a8d', '#c8d4e0'],
    accent: '#8fafc4',
    description:
      'Audit crawl paths, schema structures, speed bottlenecks, and build semantic keyword clusters. We steer organic visitors straight to your deck.',
    sigil_url: '/images/one.jpg',
    bg: 'linear-gradient(135deg, #0d1117 0%, #1a2332 60%, #0d1117 100%)',
    borderColor: '#4a6380',
  },
  {
    id: 'lannister',
    name: 'GOOGLE ADS',
    seat: 'ROAS Performance Max',
    words: '"Hear Me Roar in Search"',
    region: 'Paid Acquisition',
    sigil: 'Intent-Driven Ad Campaigns',
    colors: ['#c9a84c', '#e8c97a'],
    accent: '#d4a84b',
    description:
      'Search campaigns, Display, and Shopping setups built around maximum conversion. A/B landing copy and negative keyword targeting with surgical precision.',
    sigil_url: '/images/two.jpg',
    bg: 'linear-gradient(135deg, #1a1200 0%, #2a1f00 60%, #1a1200 100%)',
    borderColor: '#7a6130',
  },
  {
    id: 'targaryen',
    name: 'META ADS',
    seat: 'Facebook & Instagram',
    words: '"Fire and Lead Flow"',
    region: 'Paid Acquisition',
    sigil: 'Funnel Retargeting & Creative',
    colors: ['#c41e3a', '#ff4466'],
    accent: '#c0392b',
    description:
      'Dynamic visual setups targeting target demographics. Retargeting funnels, custom pixel telemetry, and creative strategies that scale budget into revenue.',
    sigil_url: '/images/three.png',
    bg: 'linear-gradient(135deg, #1a0000 0%, #2d0a0a 60%, #1a0000 100%)',
    borderColor: '#7a1a1a',
  },
  {
    id: 'baratheon',
    name: 'WEB DEVELOPMENT',
    seat: 'React • Next.js • WP',
    words: '"Ours Is The Speed"',
    region: 'Frontend Engineering',
    sigil: 'High-Performance Clean Code',
    colors: ['#e8c97a', '#f5e6c8'],
    accent: '#c9a84c',
    description:
      'Fast, modern, and SEO-compliant websites. Custom themes, Gutenberg blocks, and Single Page Apps built for rapid loads and clean architecture.',
    sigil_url: '/images/four.webp',
    bg: 'linear-gradient(135deg, #0a0a00 0%, #1f1c00 60%, #0a0a00 100%)',
    borderColor: '#5a5020',
  },
  {
    id: 'greyjoy',
    name: 'PERFORMANCE MARKETING',
    seat: 'Full Funnel Media Buying',
    words: '"We Do Not Waste"',
    region: 'Growth Strategy',
    sigil: 'Cross-Network Data Attribution',
    colors: ['#d4af37', '#8b8b6b'],
    accent: '#b8a040',
    description:
      'Multi-channel growth strategies syncing Paid Ads, Technical SEO, and conversion trackers into a single, high-performing lead generation engine.',
    sigil_url: '/images/five.jpg',
    bg: 'linear-gradient(135deg, #050810 0%, #0a1020 60%, #050810 100%)',
    borderColor: '#3a4a5a',
  },
  {
    id: 'tyrell',
    name: 'LANDING PAGES',
    seat: 'UX & CRO Optimizations',
    words: '"Growing Conversions Stronger"',
    region: 'Conversion Strategy',
    sigil: 'Wireframing & Copywriting',
    colors: ['#4a7c3f', '#7ab648'],
    accent: '#5a9e48',
    description:
      'Highly persuasive layouts designed specifically for ad landing zones. Optimizing user flows, CTAs, and load speeds to squeeze value out of clicks.',
    sigil_url: '/images/six.jpg',
    bg: 'linear-gradient(135deg, #030a00 0%, #0a1800 60%, #030a00 100%)',
    borderColor: '#2a4a20',
  },
]

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null)
  const sigilRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

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

  // Sigil tilt on hover
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14
    if (sigilRef.current) {
      sigilRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.06)`
    }
  }

  const handleMouseLeave = () => {
    if (sigilRef.current) sigilRef.current.style.transform = ''
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={`house-card house-card--${service.id}`}
      style={{
        '--accent': service.accent,
        '--border': service.borderColor,
        background: service.bg,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Corner ornaments */}
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      {/* Glow pulse on hover */}
      <div className="card-glow" />

      {/* Sigil Image */}
      <div ref={sigilRef} className="house-sigil-wrap">
        {!imgError ? (
          <img
            className="house-sigil-img"
            src={service.sigil_url}
            alt={`${service.name} sigil`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="house-sigil-fallback">{service.name[0]}</div>
        )}
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
      </div>

      {/* Hover Reveal Content */}
      <div className={`house-hover-content ${hovered ? 'hover-visible' : ''}`}>
        <p className="hover-words">{service.words}</p>
        <div className="house-divider hover-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h2 className="hover-name">{service.name}</h2>
        <p className="hover-desc">{service.description}</p>
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

  return (
    <section id="services" ref={sectionRef} className="relative w-full py-24 bg-[#050403] overflow-hidden">
      {/* Ambient background textures */}
      <div className="absolute inset-0 opacity-[0.045] pointer-events-none bg-repeat bg-[size:220px] bg-[image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_300_300%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.65)_100%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-16">
          <p ref={subRef} className="font-headings text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase mb-4 opacity-0 translate-y-7 transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            THE CHRONICLES OF GROWTH
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span className="text-[#c9a84c] filter drop-shadow-[0_0_8px_rgba(201,168,76,0.7)] text-sm">✦</span>
            <span className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>
          <h2 ref={headingRef} className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-[#f5e6c8] uppercase mb-4 opacity-0 translate-y-7 transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Services <em>Rendered</em>
          </h2>
          <p className="font-body text-xs md:text-sm text-[#8a8070] italic tracking-wide max-w-md mx-auto mt-4">
            Six distinct specialties. Built for conversions, scaled for reach, and optimized for search.
          </p>
        </header>

        {/* Services Grid */}
        <div className="houses-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Section Footer Ornament */}
        <div className="flex items-center justify-center gap-6 mt-20">
          <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/30" />
          <span className="text-[#c9a84c]/40 text-lg">⚔</span>
          <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/30" />
        </div>
      </div>
    </section>
  )
}
