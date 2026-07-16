import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { testimonials } from '../../content/testimonials'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section id="testimonials" className="relative w-full py-24 bg-[#0d0b08] border-t border-[#d4a13a]/10 overflow-hidden ambient-ocean">
      {/* Background graphic */}
      <div className="absolute top-10 left-10 text-[#d4a13a] opacity-[0.02] pointer-events-none select-none">
        <FaQuoteLeft size={240} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-headings text-[10px] tracking-[0.5em] text-[#d4a13a] uppercase mb-4">
            WORDS FROM THE CREW
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4a13a]/50" />
            <span className="text-[#d4a13a] filter drop-shadow-[0_0_8px_rgba(212,161,58,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4a13a]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase">
            Testimonials
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-[#0d0b08] border border-[#d4a13a]/20 p-8 md:p-12 shadow-[0_0_30px_rgba(212,161,58,0.05)] overflow-hidden min-h-[300px] flex flex-col justify-between rounded-sm">
          <FaQuoteLeft className="text-[#d4a13a] text-3xl opacity-30 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {/* Quote */}
              <p className="text-[#f0e4c8] font-body text-base md:text-lg italic leading-relaxed mb-8 tracking-wide">
                "{current.quote}"
              </p>

              {/* Client Info */}
              <div>
                <h4 className="font-headings text-md font-bold text-[#d4a13a] tracking-widest uppercase">
                  {current.name}
                </h4>
                <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase mt-2">
                  {current.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#d4a13a]/10">
            {/* Dots */}
            <div className="flex items-center gap-2 flex-wrap">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-sm transform rotate-45 transition-all duration-300 ${
                    i === index ? 'bg-[#d4a13a] scale-125' : 'bg-[#d4a13a]/20 hover:bg-[#d4a13a]/50'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Nav arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-[#d4a13a]/20 flex items-center justify-center text-[#8a8070] hover:text-[#d4a13a] hover:border-[#d4a13a]/50 transition-colors rounded-sm"
                aria-label="Previous Review"
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-[#d4a13a]/20 flex items-center justify-center text-[#8a8070] hover:text-[#d4a13a] hover:border-[#d4a13a]/50 transition-colors rounded-sm"
                aria-label="Next Review"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
