import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFeatherAlt, FaEnvelope, FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa'
import { contact } from '../../content/contact'

const CHANNELS = [
  { icon: FaEnvelope, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: FaWhatsapp, label: 'WhatsApp', value: contact.whatsappDisplay, href: `https://wa.me/${contact.whatsapp}`, external: true },
  { icon: FaLinkedin, label: 'LinkedIn', href: contact.linkedin, external: true, iconOnly: true },
  { icon: FaGithub, label: 'GitHub', href: contact.github, external: true, iconOnly: true },
]

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
    <section id="contact" className="relative w-full py-24 bg-[#0d0b08] overflow-hidden border-t border-[#d4a13a]/10 ambient-ocean">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="eyebrow text-[#d4a13a] mb-4">
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

        {/* Business-card panel — the whole content styled like Wasif's card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto overflow-hidden rounded-2xl bg-[#f6efdf] ring-1 ring-[#a07d33]/30 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.85)]"
        >
          {/* Warm paper highlight */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(255,252,244,0.7),transparent_60%)]" />

          {/* Gold swirl ornament (top-right) */}
          <svg
            viewBox="0 0 120 120"
            className="absolute -top-5 -right-5 w-44 h-44 text-[#c49a44] opacity-40 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M110 20 C70 10 40 40 55 70 C64 88 92 86 96 66 C99 51 82 44 74 55 C69 62 76 71 84 67" strokeLinecap="round" />
            <path d="M104 12 C112 30 110 50 96 62" strokeLinecap="round" opacity="0.6" />
          </svg>

          {/* Botanical line-art (bottom-left) */}
          <svg
            viewBox="0 0 120 120"
            className="absolute -bottom-4 -left-4 w-40 h-40 text-[#c49a44] opacity-30 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M10 118 C22 92 20 60 40 44" strokeLinecap="round" />
            <path d="M28 78 C18 74 12 66 12 56" strokeLinecap="round" />
            <path d="M30 64 C42 62 50 54 50 44" strokeLinecap="round" />
            <path d="M26 92 C16 90 10 82 10 72" strokeLinecap="round" />
          </svg>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Identity + channels */}
            <div className="p-8 md:p-12 lg:border-r border-[#a07d33]/20">
              {/* Monogram */}
              <div className="w-12 h-12 rounded-full border border-[#a07d33] flex items-center justify-center mb-7">
                <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[#a07d33] text-2xl font-semibold">W</span>
              </div>

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl md:text-4xl font-semibold text-[#2e2a20] tracking-[0.12em] leading-none mb-4">
                MOHD WASIF
              </h3>
              <div className="w-12 h-[2px] bg-[#a07d33] mb-4" />
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#6b6350] text-[10px] tracking-[0.32em] uppercase mb-1.5">
                Performance Marketing Specialist
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#9a8f74] text-[9px] tracking-[0.28em] uppercase mb-8">
                SEO &middot; Google Ads &middot; Web Dev
              </p>

              {/* Contact rows */}
              <div className="space-y-3.5 border-t border-[#a07d33]/25 pt-6">
                {CHANNELS.map((channel) => {
                  const Icon = channel.icon
                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noreferrer' : undefined}
                      aria-label={channel.label}
                      title={channel.label}
                      className="group flex items-center gap-3.5"
                    >
                      <span className="w-8 h-8 rounded-full border border-[#a07d33]/40 flex items-center justify-center text-[#a07d33] shrink-0 group-hover:bg-[#a07d33] group-hover:text-[#f6efdf] transition-colors duration-300">
                        <Icon size={12} />
                      </span>
                      {!channel.iconOnly && (
                        <span
                          style={{ fontFamily: "'Jost', sans-serif" }}
                          className="text-[#3f3a2e] text-sm tracking-wide break-all group-hover:text-[#a07d33] transition-colors duration-300"
                        >
                          {channel.value}
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>

              <div className="mt-8 pt-4 border-t border-[#a07d33]/20 flex items-center justify-between">
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#9a8f74] text-[9px] tracking-[0.25em] uppercase">
                  Delhi, India
                </span>
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#9a8f74] text-[9px] tracking-[0.25em] uppercase">
                  Crafted Performance
                </span>
              </div>
            </div>

            {/* Right: Message form (paper-styled) */}
            <div className="p-8 md:p-12 border-t lg:border-t-0 border-[#a07d33]/20">
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#6b6350] text-[10px] tracking-[0.32em] uppercase mb-6">
                Send a Message
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: 'name', type: 'text', label: 'Your Name', placeholder: 'Jane Doe' },
                    { id: 'email', type: 'email', label: 'Email Address', placeholder: 'you@company.com' },
                  ].map((f) => (
                    <div key={f.id} className="flex flex-col">
                      <label htmlFor={f.id} style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#8a7f64] text-[9px] tracking-[0.2em] uppercase mb-2">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        id={f.id}
                        name={f.id}
                        required
                        value={formData[f.id]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        style={{ fontFamily: "'Jost', sans-serif" }}
                        className="px-4 py-3 rounded-sm border border-[#a07d33]/25 bg-[#efe5cf] text-sm text-[#3f3a2e] placeholder-[#9a8f74]/70 focus:outline-none focus:border-[#a07d33] focus:bg-[#f3ead6] transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="subject" style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#8a7f64] text-[9px] tracking-[0.2em] uppercase mb-2">
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
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="px-4 py-3 rounded-sm border border-[#a07d33]/25 bg-[#efe5cf] text-sm text-[#3f3a2e] placeholder-[#9a8f74]/70 focus:outline-none focus:border-[#a07d33] focus:bg-[#f3ead6] transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#8a7f64] text-[9px] tracking-[0.2em] uppercase mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className="px-4 py-3 rounded-sm border border-[#a07d33]/25 bg-[#efe5cf] text-sm text-[#3f3a2e] placeholder-[#9a8f74]/70 focus:outline-none focus:border-[#a07d33] focus:bg-[#f3ead6] transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="w-full py-3.5 rounded-sm font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-3 bg-[#a07d33] text-[#f6efdf] hover:bg-[#8c6a28] hover:-translate-y-0.5 shadow-[0_8px_20px_-8px_rgba(160,125,51,0.6)]"
                >
                  <FaFeatherAlt size={13} />
                  <span>Send Message</span>
                </button>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#9a8f74] text-[10px] text-center">
                  Opens your email app with this message pre-filled.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
