import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaBookOpen } from 'react-icons/fa'
import { bio, journey } from '../../content/profile'
import PhotoDither from '../three/PhotoDither'

// Helper for counting up numbers when visible
function Counter({ value, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseFloat(value)
    if (isNaN(end)) return

    const totalMiliseconds = duration * 1000
    const stepTime = Math.abs(Math.floor(totalMiliseconds / end))
    
    // Safety cap for step time to avoid freeze
    const interval = Math.max(stepTime, 16) 
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / interval))
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const STATS = [
  { label: 'Years of Experience', value: '5', suffix: '+' },
  { label: 'Certifications Earned', value: '10', suffix: '+' },
  { label: 'Client Testimonials', value: '25', suffix: '+' },
  { label: 'Websites Delivered', value: '20', suffix: '+' },
]

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-[#0d0b08] overflow-hidden">
      {/* Decorative background grid & ambient light */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#d4a13a_1px,transparent_1px),linear-gradient(to_bottom,#d4a13a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_20%,#0d0b08_100%)]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="eyebrow text-[#d4a13a] mb-4">
            THE LOG BOOK
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4a13a]/50" />
            <span className="text-[#d4a13a] filter drop-shadow-[0_0_8px_rgba(212,161,58,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4a13a]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase">
            {bio.title}
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait in a gold porthole frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-sm aspect-square rounded-full border-[6px] border-[#1a1512] shadow-[0_0_0_2px_rgba(212,161,58,0.4),0_0_50px_rgba(212,161,58,0.1)] overflow-hidden group"
            >
              {/* Portrait with mouse-following halftone dither effect */}
              <PhotoDither src="/wasif-portrait.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/70 via-transparent to-transparent pointer-events-none" />

              {/* Porthole glass rim + bolts */}
              <div className="absolute inset-0 rounded-full border-2 border-[#d4a13a]/30 pointer-events-none" />
              <div className="absolute inset-[10px] rounded-full border border-[#f0e4c8]/10 pointer-events-none" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <span
                  key={deg}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#d4a13a]/70 shadow-[0_0_4px_rgba(212,161,58,0.6)]"
                  style={{
                    top: `${50 - 47 * Math.cos((deg * Math.PI) / 180)}%`,
                    left: `${50 + 47 * Math.sin((deg * Math.PI) / 180)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* Name Label */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center bg-[#0d0b08]/80 px-4 py-1 border border-[#d4a13a]/20 rounded backdrop-blur-sm z-10 pointer-events-none">
                <p className="text-[#f0e4c8] font-headings text-sm tracking-widest uppercase">Mohd Wasif</p>
                <p className="text-[#d4a13a] text-[9px] tracking-[0.2em] uppercase font-body mt-1">{bio.location}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Story & Chronology */}
          <div className="lg:col-span-7 text-white">
            <h3 className="font-headings text-xl md:text-2xl font-bold tracking-widest text-[#d4a13a] mb-6 flex items-center gap-3">
              <FaBookOpen className="text-lg text-[#f0e4c8]" />
              <span>THE STORY SO FAR</span>
            </h3>

            <div className="space-y-6 font-body text-[#8a8070] text-sm md:text-base leading-relaxed tracking-wide">
              {bio.summary.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[#d4a13a]/20">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <h4 className="font-headings text-3xl md:text-4xl font-extrabold text-[#d4a13a] drop-shadow-[0_2px_10px_rgba(212,161,58,0.3)]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h4>
                  <p className="text-[#8a8070] text-[10px] font-label font-semibold tracking-widest mt-2 uppercase leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mt-24 md:mt-32">
          <h3 className="font-headings text-xl md:text-2xl font-bold tracking-widest text-[#d4a13a] mb-10 text-center uppercase">
            The Journey So Far
          </h3>
          <div className="max-w-3xl mx-auto relative border-l border-[#d4a13a]/20 pl-8 space-y-8">
            {journey.map((stage, idx) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className="relative"
              >
                <span className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-[#d4a13a] shadow-[0_0_10px_rgba(212,161,58,0.5)]" />
                <h4 className="font-headings text-sm md:text-base font-bold tracking-[0.15em] text-[#f0e4c8] uppercase">
                  {stage.label}
                </h4>
                <p className="text-[#8a8070] text-xs md:text-sm font-body mt-1">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
