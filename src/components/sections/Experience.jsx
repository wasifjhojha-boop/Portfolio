import { motion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaScroll } from 'react-icons/fa'
import { experience, education } from '../../content/profile'

const TIMELINE = [
  ...experience.map((item) => ({
    type: 'work',
    role: item.role,
    company: `${item.company} · ${item.location}`,
    period: item.period,
    points: item.points,
  })),
  ...education.map((item) => ({
    type: 'education',
    role: item.degree,
    company: item.institution,
    period: item.period,
    points: null,
  })),
]

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-24 bg-[#1a1512] overflow-hidden border-t border-[#d4a13a]/10 ambient-ocean">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(212,161,58,0.03)_0%,transparent_100%)]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="eyebrow text-[#d4a13a] mb-4">
            THE LOG
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4a13a]/50" />
            <span className="text-[#d4a13a] filter drop-shadow-[0_0_8px_rgba(212,161,58,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4a13a]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase">
            Experience &amp; Education
          </h2>
        </div>

        {/* Timeline Line */}
        <div className="relative border-l border-[#d4a13a]/20 md:border-none pl-6 md:pl-0">
          {/* Vertical central bar on desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d4a13a]/80 via-[#f0e4c8]/40 to-transparent -translate-x-1/2 hidden md:block" />

          {TIMELINE.map((item, idx) => {
            const isLeft = idx % 2 === 0
            const Icon = item.type === 'work' ? FaBriefcase : FaGraduationCap
            const cardContent = (
              <>
                <div className={`flex flex-col mb-3 ${isLeft ? 'md:items-end' : ''}`}>
                  <span className="flex items-center gap-1.5 text-[#d4a13a] text-[10px] font-semibold font-label tracking-[0.2em] uppercase mb-1">
                    <FaScroll size={10} />
                    {item.period}
                  </span>
                  <h3 className="font-headings text-xl font-bold text-[#f0e4c8] tracking-wider">
                    {item.role}
                  </h3>
                  <p className="text-[#8a8070] text-[10px] font-label font-semibold tracking-[0.2em] uppercase mt-1">
                    {item.company}
                  </p>
                </div>
                {item.points ? (
                  <ul className={`text-[#8a8070] text-xs md:text-sm font-body leading-relaxed tracking-wide list-disc space-y-1 ${isLeft ? 'md:list-inside md:text-right' : 'list-inside'}`}>
                    {item.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                ) : null}
              </>
            )

            return (
              <div key={idx} className="relative md:grid md:grid-cols-2 md:gap-12 items-center mb-12">
                {/* Node Marker */}
                <div className="absolute -left-[37px] md:left-1/2 top-4 md:-translate-x-1/2 w-8 h-8 rounded-sm border border-[#d4a13a] bg-[#0d0b08] z-10 flex items-center justify-center text-[#d4a13a] shadow-[0_0_10px_rgba(212,161,58,0.3)] transform rotate-45">
                  <Icon size={12} className="-rotate-45" />
                </div>

                {isLeft ? (
                  <motion.div
                    whileHover={{ x: 3 }}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="p-6 relative text-left md:col-start-1 md:text-right border-r-2 border-[#d4a13a] bg-gradient-to-l from-[#d4a13a]/10 to-transparent"
                  >
                    {cardContent}
                  </motion.div>
                ) : (
                  <div className="hidden md:block" />
                )}

                {!isLeft ? (
                  <motion.div
                    whileHover={{ x: -3 }}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="p-6 relative text-left md:col-start-2 border-l-2 border-[#d4a13a] bg-gradient-to-r from-[#d4a13a]/10 to-transparent"
                  >
                    {cardContent}
                  </motion.div>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
