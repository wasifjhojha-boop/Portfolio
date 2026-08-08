import { useEffect, useRef, useState } from 'react'
import {
  FaSearch,
  FaGoogle,
  FaFacebook,
  FaCode,
  FaChartLine,
  FaBullseye,
} from 'react-icons/fa'
import './Services.css'
import MorphicBackground from '../three/MorphicBackground'

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

      {/* Service icon */}
      <div ref={sigilRef} className="house-sigil-wrap">
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
    <section id="services" ref={sectionRef} className="relative w-full py-24 bg-[#ffffff] overflow-hidden">
      <MorphicBackground ballColor="#d4a13a" className="absolute inset-0 -z-0 bg-transparent" />

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
          <h2 ref={headingRef} className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase mb-4 opacity-0 translate-y-7 transition-all duration-700 [&.visible]:opacity-100 [&.visible]:translate-y-0">
            Services <em>Rendered</em>
          </h2>
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

        {/* Section Footer Ornament */}
        <div className="flex items-center justify-center gap-6 mt-20">
          <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-[#a07d33]/30" />
          <span className="w-1 h-1 rounded-full bg-[#a07d33]/40 inline-block" />
          <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-[#a07d33]/30" />
        </div>
      </div>
    </section>
  )
}
