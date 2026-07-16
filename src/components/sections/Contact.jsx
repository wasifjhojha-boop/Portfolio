import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFeatherAlt, FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa'
import { contact } from '../../content/contact'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <section id="contact" className="relative w-full py-24 bg-[#0a1628] overflow-hidden border-t border-[#d4a13a]/10 ambient-ocean">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="font-headings text-[10px] tracking-[0.5em] text-[#d4a13a] uppercase mb-4">
            DROP ANCHOR
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4a13a]/50" />
            <span className="text-[#d4a13a] filter drop-shadow-[0_0_8px_rgba(212,161,58,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4a13a]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase">
            Get In Touch
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates & Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-headings text-xl md:text-2xl font-bold tracking-widest text-[#d4a13a] mb-6">
                CONTACT CHANNELS
              </h3>
              <p className="font-body text-[#8a8070] text-sm md:text-base leading-relaxed tracking-wide mb-8">
                Have a project in mind — SEO, paid ads, a new website, or all three? Reach out directly or use the form.
              </p>

              {/* Direct coordinates grid */}
              <div className="space-y-6">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#d4a13a]/20 bg-[#0e3b4f] flex items-center justify-center text-[#8a8070] group-hover:text-[#d4a13a] group-hover:border-[#d4a13a]/50 transition-all duration-300">
                    <FaEnvelope size={14} />
                  </div>
                  <div>
                    <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase">Email</p>
                    <p className="text-[#f0e4c8] font-body text-sm font-semibold tracking-wide group-hover:text-[#d4a13a] transition-colors duration-300">
                      {contact.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#d4a13a]/20 bg-[#0e3b4f] flex items-center justify-center text-[#8a8070] group-hover:text-[#d4a13a] group-hover:border-[#d4a13a]/50 transition-all duration-300">
                    <FaWhatsapp size={14} />
                  </div>
                  <div>
                    <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase">WhatsApp</p>
                    <p className="text-[#f0e4c8] font-body text-sm font-semibold tracking-wide group-hover:text-[#d4a13a] transition-colors duration-300">
                      {contact.whatsappDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#d4a13a]/20 bg-[#0e3b4f] flex items-center justify-center text-[#8a8070] group-hover:text-[#d4a13a] group-hover:border-[#d4a13a]/50 transition-all duration-300">
                    <FaLinkedin size={14} />
                  </div>
                  <div>
                    <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase">LinkedIn</p>
                    <p className="text-[#f0e4c8] font-body text-sm font-semibold tracking-wide group-hover:text-[#d4a13a] transition-colors duration-300">
                      linkedin.com/in/mohd-wasif1
                    </p>
                  </div>
                </a>

                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-sm border border-[#d4a13a]/20 bg-[#0e3b4f] flex items-center justify-center text-[#8a8070] group-hover:text-[#d4a13a] group-hover:border-[#d4a13a]/50 transition-all duration-300">
                    <FaGithub size={14} />
                  </div>
                  <div>
                    <p className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase">GitHub</p>
                    <p className="text-[#f0e4c8] font-body text-sm font-semibold tracking-wide group-hover:text-[#d4a13a] transition-colors duration-300">
                      github.com/wasifjhojha-boop
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="mt-12 p-4 rounded-sm bg-[#0e3b4f] border border-[#d4a13a]/10 flex items-center justify-between text-xs text-[#8a8070]">
              <span>Based in: Delhi, India</span>
              <span className="text-[#d4a13a]">✦</span>
              <span>GMT+5:30</span>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#0a1628] border border-[#d4a13a]/20 p-8 md:p-10 rounded-sm shadow-[0_0_40px_rgba(212,161,58,0.03)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="px-4 py-3 rounded-sm border border-[#d4a13a]/10 bg-[#0e3b4f] font-body text-sm text-[#f0e4c8] placeholder-[#8a8070]/50 focus:outline-none focus:border-[#d4a13a]/50 focus:bg-[#0e3b4f]/80 transition-all duration-300"
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
                      placeholder="you@company.com"
                      className="px-4 py-3 rounded-sm border border-[#d4a13a]/10 bg-[#0e3b4f] font-body text-sm text-[#f0e4c8] placeholder-[#8a8070]/50 focus:outline-none focus:border-[#d4a13a]/50 focus:bg-[#0e3b4f]/80 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col">
                  <label htmlFor="subject" className="text-[#8a8070] text-[9px] font-headings tracking-[0.2em] uppercase mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="New project inquiry"
                    className="px-4 py-3 rounded-sm border border-[#d4a13a]/10 bg-[#0e3b4f] font-body text-sm text-[#f0e4c8] placeholder-[#8a8070]/50 focus:outline-none focus:border-[#d4a13a]/50 focus:bg-[#0e3b4f]/80 transition-all duration-300"
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
                    placeholder="Tell me about your project..."
                    className="px-4 py-3 rounded-sm border border-[#d4a13a]/10 bg-[#0e3b4f] font-body text-sm text-[#f0e4c8] placeholder-[#8a8070]/50 focus:outline-none focus:border-[#d4a13a]/50 focus:bg-[#0e3b4f]/80 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-sm font-headings font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-[#d4a13a] to-[#d4a13a] text-[#0a1628] hover:shadow-[0_0_20px_rgba(212,161,58,0.3)] hover:-translate-y-0.5 border border-[#d4a13a]"
                >
                  <FaFeatherAlt size={14} />
                  <span>Send Message</span>
                </button>
                <p className="text-[#8a8070]/60 text-[10px] font-body text-center -mt-2">
                  Opens your email app with this message pre-filled.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
