import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaBookOpen } from 'react-icons/fa'
import { bio, journey } from '../../content/profile'
import ElectricCard from '../ui/ElectricCard'
import JourneyTimeline from '../ui/JourneyTimeline'

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
    <section id="about" className="relative w-full py-24 md:py-32 bg-[#ffffff] overflow-hidden">
      {/* Decorative background grid & ambient light */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#a07d33_1px,transparent_1px),linear-gradient(to_bottom,#a07d33_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_20%,#ffffff_100%)]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="eyebrow text-[#a07d33] mb-4">
            ABOUT ME
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#a07d33]/50" />
            <span className="w-1 h-1 rounded-full bg-[#a07d33]/60" />
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#a07d33]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase">
            {bio.title}
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: electric-border portrait card */}
          <div className="lg:col-span-5 flex justify-center">
            <ElectricCard alt={`${bio.name} — ${bio.location}`} />
          </div>

          {/* Right Column: Story & Chronology */}
          <div className="lg:col-span-7 text-white">
            <h3 className="font-headings text-xl md:text-2xl font-bold tracking-widest text-[#a07d33] mb-6 flex items-center gap-3">
              <FaBookOpen className="text-lg text-[#191712]" />
              <span>THE STORY SO FAR</span>
            </h3>

            <div className="space-y-6 font-body text-[#5f594c] text-sm md:text-base leading-relaxed tracking-wide">
              {bio.summary.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[#a07d33]/20">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <h4 className="font-headings text-3xl md:text-4xl font-extrabold text-[#a07d33] drop-shadow-[0_2px_10px_rgba(160,125,51,0.3)]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h4>
                  <p className="text-[#5f594c] text-[10px] font-label font-semibold tracking-widest mt-2 uppercase leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mt-24 md:mt-32">
          <h3 className="font-headings text-xl md:text-2xl font-bold tracking-widest text-[#a07d33] mb-10 text-center uppercase">
            The Journey So Far
          </h3>
          <div className="max-w-5xl mx-auto">
            <JourneyTimeline items={journey} />
          </div>
        </div>
      </div>
    </section>
  )
}
