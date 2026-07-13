import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaBookOpen } from 'react-icons/fa'

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
  { label: 'Ads Budget Managed', value: '1.2', suffix: 'M+' },
  { label: 'SEO Traffic Growth', value: '250', suffix: '%+' },
  { label: 'Websites Built', value: '45', suffix: '+' },
]

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-[#050403] overflow-hidden">
      {/* Decorative background grid & ambient light */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#c9a84c_1px,transparent_1px),linear-gradient(to_bottom,#c9a84c_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_20%,#050403_100%)]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-headings text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase mb-4">
            THE ARCHIVES
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span className="text-[#c9a84c] filter drop-shadow-[0_0_8px_rgba(201,168,76,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-[#f5e6c8] uppercase">
            The Maester's Records
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Glassmorphic Astrolabe/Seal Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-sm aspect-square rounded-full border-2 border-[#c9a84c]/20 bg-[#0a0806]/80 backdrop-blur-md p-8 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.05)] overflow-hidden group"
            >
              {/* Outer compass ring */}
              <div className="absolute w-[85%] h-[85%] rounded-full border-2 border-dashed border-[#c9a84c]/30 flex items-center justify-center animate-spin-slow" />
              
              {/* Gold compass markings */}
              <div className="absolute top-6 text-[#c9a84c]/60 font-headings text-sm font-bold tracking-widest">XII</div>
              <div className="absolute right-6 text-[#c9a84c]/60 font-headings text-sm font-bold tracking-widest">III</div>
              <div className="absolute bottom-6 text-[#c9a84c]/60 font-headings text-sm font-bold tracking-widest">VI</div>
              <div className="absolute left-6 text-[#c9a84c]/60 font-headings text-sm font-bold tracking-widest">IX</div>

              {/* Decorative inner graphics (Sun Spear/Astrolabe style) */}
              <div className="w-[65%] h-[65%] rounded-full border border-[#c9a84c]/40 flex items-center justify-center relative">
                <div className="absolute w-[2px] h-[85%] bg-gradient-to-b from-[#c9a84c] via-[#f5e6c8] to-transparent transform rotate-45" />
                <div className="absolute w-[2px] h-[85%] bg-gradient-to-b from-[#c9a84c] via-[#f5e6c8] to-transparent transform -rotate-45" />
                <div className="w-12 h-12 rounded-full bg-[#050403] border-2 border-[#c9a84c] z-10 flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.5)]">
                  <div className="w-3 h-3 rounded-full bg-[#f5e6c8] animate-pulse" />
                </div>
              </div>

              {/* Card Bottom Label */}
              <div className="absolute bottom-16 text-center bg-[#050403]/80 px-4 py-1 border border-[#c9a84c]/20 rounded backdrop-blur-sm">
                <p className="text-[#f5e6c8] font-headings text-sm tracking-widest uppercase">Mohd Wasif</p>
                <p className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase font-body mt-1">Master of Code & Coin</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Story & Chronology */}
          <div className="lg:col-span-7 text-white">
            <h3 className="font-headings text-xl md:text-2xl font-bold tracking-widest text-[#c9a84c] mb-6 flex items-center gap-3">
              <FaBookOpen className="text-lg text-[#f5e6c8]" />
              <span>THE TALES OF GROWTH</span>
            </h3>
            
            <div className="space-y-6 font-body text-[#8a8070] text-sm md:text-base leading-relaxed tracking-wide">
              <p>
                I am <strong className="text-[#f5e6c8]">Mohd Wasif</strong>, a tactician of the digital realm. For over five years, I have forged alliances and orchestrated campaigns for houses seeking absolute dominion over their markets, mastering the ancient arts of search engine optimization, paid acquisition, and high-performance engineering.
              </p>
              <p>
                My arsenal includes the precision of Google Ads, the vast networks of Meta campaigns, and the deep architecture of technical SEO. Much like a master armorer, I forge robust digital infrastructure using React, Next.js, and bespoke WordPress architectures to ensure your banners fly highest in search rankings.
              </p>
              <p>
                Whether you seek to conquer organic territories, optimize your treasury's ad spend, or construct an impenetrable fortress of a corporate website, I swear my banners to your growth and victory.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[#c9a84c]/20">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <h4 className="font-headings text-3xl md:text-4xl font-extrabold text-[#c9a84c] drop-shadow-[0_2px_10px_rgba(201,168,76,0.3)]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h4>
                  <p className="text-[#8a8070] text-[10px] font-headings font-bold tracking-widest mt-2 uppercase leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
