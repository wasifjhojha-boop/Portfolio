import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'

const REVIEWS = [
  {
    quote: "Wasif completely transformed our search visibility. Our organic clicks went from virtually nothing to being our primary source of qualified leads in under 6 months. A master digital tactician!",
    name: "Sarah Jenkins",
    role: "Director of Marketing, LexCorp Legal",
    stars: 5,
  },
  {
    quote: "We hired Wasif to develop our client portal and run our paid campaigns. The React/Next.js dashboard he built is blazing fast, and our Google Ads acquisition cost dropped by 30% almost instantly.",
    name: "Marcus Vance",
    role: "Founder, Odyssey Travel Tech",
    stars: 5,
  },
  {
    quote: "Bespoke engineering mixed with thorough analytics insight. Wasif built our custom WordPress infrastructure and hooked it up directly to Google Tag Manager and GA4. Excellent communicator and developer.",
    name: "David K.",
    role: "Technical Lead, Nexus Capital",
    stars: 5,
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % REVIEWS.length)
  }

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
  }

  const current = REVIEWS[index]

  return (
    <section id="testimonials" className="relative w-full py-24 bg-[#080605] border-t border-[#c9a84c]/10 overflow-hidden">
      {/* Background graphic */}
      <div className="absolute top-10 left-10 text-[#c9a84c] opacity-[0.02] pointer-events-none select-none">
        <FaQuoteLeft size={240} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-headings text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase mb-4">
            ALLIES & LORDS
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span className="text-[#c9a84c] filter drop-shadow-[0_0_8px_rgba(201,168,76,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-[#f5e6c8] uppercase">
            Words of the Realm
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-[#050403] border border-[#c9a84c]/20 p-8 md:p-12 shadow-[0_0_30px_rgba(201,168,76,0.05)] overflow-hidden min-h-[300px] flex flex-col justify-between rounded-sm">
          <FaQuoteLeft className="text-[#c9a84c] text-3xl opacity-30 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {/* Stars */}
              <div className="flex items-center gap-1.5 mb-6 text-[#c9a84c]">
                {Array.from({ length: current.stars }).map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#f5e6c8] font-body text-base md:text-lg italic leading-relaxed mb-8 tracking-wide">
                "{current.quote}"
              </p>

              {/* Client Info */}
              <div>
                <h4 className="font-headings text-md font-bold text-[#c9a84c] tracking-widest uppercase">
                  {current.name}
                </h4>
                <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase mt-2">
                  {current.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#c9a84c]/10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-sm transform rotate-45 transition-all duration-300 ${
                    i === index ? 'bg-[#c9a84c] scale-125' : 'bg-[#c9a84c]/20 hover:bg-[#c9a84c]/50'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Nav arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-[#c9a84c]/20 flex items-center justify-center text-[#8a8070] hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors rounded-sm"
                aria-label="Previous Review"
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-[#c9a84c]/20 flex items-center justify-center text-[#8a8070] hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-colors rounded-sm"
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
