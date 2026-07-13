import { motion } from 'framer-motion'
import { FaChessKnight, FaScroll } from 'react-icons/fa'

const TIMELINE = [
  {
    role: 'Lead Performance Specialist & Developer',
    company: 'Independent Consulting / Agency Contracts',
    period: '2022 - PRESENT',
    desc: 'Map out full-funnel media buying strategies across Google Ads & Meta, managing over $1M+ in budget. Simultaneously construct fast Next.js interfaces, custom WordPress backends, and implement technical SEO audit lists.',
    color: '#7a6130', // Gold
  },
  {
    role: 'SEO & Google Ads Specialist',
    company: 'Growth Marketing Agency',
    period: '2020 - 2022',
    desc: 'Conducted extensive keyword grouping and technical crawl audits for major client sites. Structured Google Search & PMax networks, configured GTM tagging variables, and achieved an average 180% organic traffic increase.',
    color: '#8b2626', // Crimson
  },
  {
    role: 'WordPress & Frontend Developer',
    company: 'Web Design Studio',
    period: '2018 - 2020',
    desc: 'Built speed-optimized custom themes and custom Gutenberg blocks. Wrote clean semantic HTML/CSS structures and client-side JavaScript features to deliver high lighthouse scores and smooth UX.',
    color: '#4a6380', // Slate
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-24 bg-[#0a0806] overflow-hidden border-t border-[#c9a84c]/10">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(201,168,76,0.03)_0%,transparent_100%)]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-headings text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase mb-4">
            THE CHRONICLES
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span className="text-[#c9a84c] filter drop-shadow-[0_0_8px_rgba(201,168,76,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-[#f5e6c8] uppercase">
            Lineage of Work
          </h2>
        </div>

        {/* Timeline Line */}
        <div className="relative border-l border-[#c9a84c]/20 md:border-none pl-6 md:pl-0">
          {/* Vertical central bar on desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c9a84c]/80 via-[#f5e6c8]/40 to-transparent -translate-x-1/2 hidden md:block" />

          {TIMELINE.map((item, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <div key={idx} className="relative md:grid md:grid-cols-2 md:gap-12 items-center mb-12">
                {/* Node Marker */}
                <div className="absolute -left-[37px] md:left-1/2 top-4 md:-translate-x-1/2 w-8 h-8 rounded-sm border border-[#c9a84c] bg-[#050403] z-10 flex items-center justify-center text-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.3)] transform rotate-45">
                  <FaChessKnight size={12} className="-rotate-45" />
                </div>

                {/* Left Card */}
                {isLeft ? (
                  <motion.div
                    whileHover={{ x: 3 }}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="p-6 relative text-left md:col-start-1 md:text-right border-r-2 bg-gradient-to-l from-[#c9a84c]/10 to-transparent"
                    style={{ borderRightColor: item.color }}
                  >
                    <div className="flex flex-col md:items-end mb-3">
                      <span className="flex items-center gap-1.5 text-[#c9a84c] text-[10px] font-bold font-headings tracking-[0.2em] uppercase mb-1">
                        <FaScroll size={10} />
                        {item.period}
                      </span>
                      <h3 className="font-headings text-xl font-bold text-[#f5e6c8] tracking-wider">
                        {item.role}
                      </h3>
                      <p className="text-[#8a8070] text-[10px] font-headings font-bold tracking-[0.2em] uppercase mt-1">
                        {item.company}
                      </p>
                    </div>
                    <p className="text-[#8a8070] text-xs md:text-sm font-body leading-relaxed tracking-wide">
                      {item.desc}
                    </p>
                  </motion.div>
                ) : (
                  <div className="hidden md:block" />
                )}

                {/* Right Card */}
                {!isLeft ? (
                  <motion.div
                    whileHover={{ x: -3 }}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="p-6 relative text-left md:col-start-2 border-l-2 bg-gradient-to-r from-[#c9a84c]/10 to-transparent"
                    style={{ borderLeftColor: item.color }}
                  >
                    <div className="flex flex-col mb-3">
                      <span className="flex items-center gap-1.5 text-[#c9a84c] text-[10px] font-bold font-headings tracking-[0.2em] uppercase mb-1">
                        <FaScroll size={10} />
                        {item.period}
                      </span>
                      <h3 className="font-headings text-xl font-bold text-[#f5e6c8] tracking-wider">
                        {item.role}
                      </h3>
                      <p className="text-[#8a8070] text-[10px] font-headings font-bold tracking-[0.2em] uppercase mt-1">
                        {item.company}
                      </p>
                    </div>
                    <p className="text-[#8a8070] text-xs md:text-sm font-body leading-relaxed tracking-wide">
                      {item.desc}
                    </p>
                  </motion.div>
                ) : (
                  <div className="hidden md:block" />
                )}
                
                {/* Fallback layout for mobile when left cards exist */}
                {isLeft && (
                  <div className="md:hidden mt-2" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
