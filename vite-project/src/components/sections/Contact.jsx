import { useState } from 'react'
import { FaFeatherAlt, FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API delay
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status back to idle after 4 seconds
      setTimeout(() => setStatus('idle'), 4000)
    }, 1500)
  }

  return (
    <section id="contact" className="relative w-full py-24 bg-[#050403] overflow-hidden border-t border-[#c9a84c]/10">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-headings text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase mb-4">
            FORM AN ALLIANCE
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span className="text-[#c9a84c] filter drop-shadow-[0_0_8px_rgba(201,168,76,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-[#f5e6c8] uppercase">
            Dispatch a Raven
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates & Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-headings text-xl md:text-2xl font-bold tracking-widest text-[#c9a84c] mb-6">
                CHANNELS & CASTLES
              </h3>
              <p className="font-body text-[#8a8070] text-sm md:text-base leading-relaxed tracking-wide mb-8">
                Ready to forge a new alliance or optimize your realm's treasury? Dispatch a raven directly or connect via the channels below.
              </p>

              {/* Direct coordinates grid */}
              <div className="space-y-6">
                <a
                  href="mailto:wasifkhan987@gmail.com"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#c9a84c]/20 bg-[#0a0806] flex items-center justify-center text-[#8a8070] group-hover:text-[#c9a84c] group-hover:border-[#c9a84c]/50 transition-all duration-300">
                    <FaEnvelope size={14} />
                  </div>
                  <div>
                    <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase">MAIL RAVEN</p>
                    <p className="text-[#f5e6c8] font-body text-sm font-semibold tracking-wide group-hover:text-[#c9a84c] transition-colors duration-300">
                      wasifkhan987@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/917834823577"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#c9a84c]/20 bg-[#0a0806] flex items-center justify-center text-[#8a8070] group-hover:text-[#c9a84c] group-hover:border-[#c9a84c]/50 transition-all duration-300">
                    <FaWhatsapp size={14} />
                  </div>
                  <div>
                    <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase">WHATSAPP RAVEN</p>
                    <p className="text-[#f5e6c8] font-body text-sm font-semibold tracking-wide group-hover:text-[#c9a84c] transition-colors duration-300">
                      +91 78348 23577
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/mohd-wasif1/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#c9a84c]/20 bg-[#0a0806] flex items-center justify-center text-[#8a8070] group-hover:text-[#c9a84c] group-hover:border-[#c9a84c]/50 transition-all duration-300">
                    <FaLinkedin size={14} />
                  </div>
                  <div>
                    <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase">LINKEDIN</p>
                    <p className="text-[#f5e6c8] font-body text-sm font-semibold tracking-wide group-hover:text-[#c9a84c] transition-colors duration-300">
                      linkedin.com/in/mohd-wasif1
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/wasifjhojha-boop/jurisroots"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#c9a84c]/20 bg-[#0a0806] flex items-center justify-center text-[#8a8070] group-hover:text-[#c9a84c] group-hover:border-[#c9a84c]/50 transition-all duration-300">
                    <FaGithub size={14} />
                  </div>
                  <div>
                    <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase">GITHUB</p>
                    <p className="text-[#f5e6c8] font-body text-sm font-semibold tracking-wide group-hover:text-[#c9a84c] transition-colors duration-300">
                      github.com/wasifjhojha-boop/jurisroots
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Vessel location coordinates */}
            <div className="mt-12 p-4 rounded-sm bg-[#0a0806] border border-[#c9a84c]/10 flex items-center justify-between text-xs text-[#8a8070]">
              <span>Seat: New Delhi, India</span>
              <span className="text-[#c9a84c]">✦</span>
              <span>Realm: GMT+5:30</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#080605] border border-[#c9a84c]/20 p-8 md:p-10 rounded-sm shadow-[0_0_40px_rgba(201,168,76,0.03)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase mb-2">
                      Your Title / Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Lord Commander Snow"
                      className="px-4 py-3 rounded-sm border border-[#c9a84c]/10 bg-[#0a0806] font-body text-sm text-[#f5e6c8] placeholder-[#8a8070]/50 focus:outline-none focus:border-[#c9a84c]/50 focus:bg-[#0a0806]/80 transition-all duration-300"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="commander@wall.com"
                      className="px-4 py-3 rounded-sm border border-[#c9a84c]/10 bg-[#0a0806] font-body text-sm text-[#f5e6c8] placeholder-[#8a8070]/50 focus:outline-none focus:border-[#c9a84c]/50 focus:bg-[#0a0806]/80 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col">
                  <label htmlFor="subject" className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase mb-2">
                    Subject / Route Target
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="New Alliance / Website Forging"
                    className="px-4 py-3 rounded-sm border border-[#c9a84c]/10 bg-[#0a0806] font-body text-sm text-[#f5e6c8] placeholder-[#8a8070]/50 focus:outline-none focus:border-[#c9a84c]/50 focus:bg-[#0a0806]/80 transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details of your venture or enemies to conquer..."
                    className="px-4 py-3 rounded-sm border border-[#c9a84c]/10 bg-[#0a0806] font-body text-sm text-[#f5e6c8] placeholder-[#8a8070]/50 focus:outline-none focus:border-[#c9a84c]/50 focus:bg-[#0a0806]/80 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full py-4 rounded-sm font-headings font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 ${
                    status === 'loading'
                      ? 'bg-[#0a0806] text-[#8a8070] border border-[#c9a84c]/20 cursor-not-allowed'
                      : status === 'success'
                      ? 'bg-[#2a4a20] text-[#f5e6c8] border border-[#2a4a20]'
                      : 'bg-gradient-to-r from-[#c9a84c] to-[#d4af37] text-[#050403] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:-translate-y-0.5 border border-[#c9a84c]'
                  }`}
                >
                  <FaFeatherAlt size={14} className={status === 'loading' ? 'animate-bounce' : ''} />
                  <span>
                    {status === 'loading'
                      ? 'DISPATCHING RAVEN...'
                      : status === 'success'
                      ? 'RAVEN DISPATCHED SUCCESSFULLY!'
                      : 'DISPATCH RAVEN'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
