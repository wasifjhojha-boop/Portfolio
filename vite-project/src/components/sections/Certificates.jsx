import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaStamp } from 'react-icons/fa'

const CERTIFICATES = [
  {
    title: 'Google Ads Search Certification',
    issuer: 'Google',
    date: 'Verified Credentials',
    desc: 'Expertise in campaign creation, bid strategies, search network configurations, and conversion parameters.',
    color: '#d4af37', // Gold
  },
  {
    title: 'Meta Certified Digital Marketing Associate',
    issuer: 'Meta',
    date: 'Verified Credentials',
    desc: 'Bespoke targeting, audience grouping, funnel configurations, lookalikes, and Meta Pixel diagnostics.',
    color: '#8b2626', // Crimson
  },
  {
    title: 'Advanced Technical SEO Expert',
    issuer: 'Industry Standard / SEMrush',
    date: 'Verified Credentials',
    desc: 'Auditing, schema mapping, page-speed benchmarks, site crawls, and structural URL migrations.',
    color: '#c9a84c', // Antique Gold
  },
]

export default function Certificates() {
  return (
    <section id="certificates" className="relative w-full py-24 bg-[#0a0806] border-t border-[#c9a84c]/10 overflow-hidden">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-headings text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase mb-4">
            VERIFIED CREDENTIALS
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span className="text-[#c9a84c] filter drop-shadow-[0_0_8px_rgba(201,168,76,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-[#f5e6c8] uppercase">
            Royal Decrees & Seals
          </h2>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-8 rounded-sm flex flex-col relative overflow-hidden group shadow-lg bg-[#050403] border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all duration-300"
            >
              {/* Gold wax seal ornament */}
              <div
                className="w-16 h-16 rounded-full border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out relative"
                style={{
                  backgroundColor: `${cert.color}15`,
                  borderColor: `${cert.color}40`,
                  boxShadow: `0 0 20px ${cert.color}20`,
                }}
              >
                <div className="absolute inset-2 rounded-full border border-dashed opacity-50" style={{ borderColor: cert.color }} />
                <FaStamp size={24} style={{ color: cert.color }} />
              </div>

              {/* Title & Issuer */}
              <div className="mb-4">
                <h3 className="font-headings text-xl font-bold text-[#f5e6c8] tracking-wide leading-tight group-hover:text-[#c9a84c] transition-colors">
                  {cert.title}
                </h3>
                <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase mt-3">
                  {cert.issuer} • {cert.date}
                </p>
              </div>

              {/* Details */}
              <p className="text-[#8a8070] text-xs font-body leading-relaxed mb-6 tracking-wide flex-1">
                {cert.desc}
              </p>

              {/* View Credentials Anchor */}
              <a
                href="#0"
                onClick={(e) => e.preventDefault()}
                className="mt-auto flex items-center gap-2 text-[#8a8070] hover:text-[#f5e6c8] text-[10px] font-bold font-headings tracking-[0.2em] uppercase transition-colors"
              >
                <span>Verify Royal Seal</span>
                <FaExternalLinkAlt size={10} />
              </a>

              {/* Top border trim */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: cert.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
