import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { contact } from '../../content/contact'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pageLinks = [
    { label: 'About', href: '/about' },
    { label: 'Skills', href: '/skills' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="relative bg-[#121110] pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-12">
          {/* Logo & Slogan */}
          <div className="text-center md:text-left">
            <h3 className="font-headings text-2xl md:text-3xl font-extrabold tracking-[0.2em] text-[#c9a86a] mb-4">
              MOHD WASIF
            </h3>
            <p className="text-[#a29c8e] text-sm font-body max-w-sm tracking-wide">
              Full-stack web development with React, Next.js, and WordPress — built to rank and convert, not just to render.
            </p>
          </div>

          {/* Social Coordinates */}
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${contact.email}`}
              className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center text-[#a29c8e] hover:text-[#0d0b08] hover:bg-[#c9a86a] hover:border-[#c9a86a] hover:-translate-y-1 transition-all duration-300 bg-white/[0.04]"
              aria-label="Email"
            >
              <FaEnvelope size={18} />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center text-[#a29c8e] hover:text-[#0d0b08] hover:bg-[#c9a86a] hover:border-[#c9a86a] hover:-translate-y-1 transition-all duration-300 bg-white/[0.04]"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center text-[#a29c8e] hover:text-[#0d0b08] hover:bg-[#c9a86a] hover:border-[#c9a86a] hover:-translate-y-1 transition-all duration-300 bg-white/[0.04]"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center text-[#a29c8e] hover:text-[#0d0b08] hover:bg-[#c9a86a] hover:border-[#c9a86a] hover:-translate-y-1 transition-all duration-300 bg-white/[0.04]"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer pages" className="flex flex-wrap justify-center gap-x-6 gap-y-3 py-8 border-b border-white/10">
          {pageLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[9px] font-label font-semibold tracking-[0.16em] uppercase text-[#a29c8e] hover:text-[#c9a86a] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 text-center text-xs font-headings text-[#8a8478] tracking-widest uppercase">
          <p>© {currentYear} Mohd Wasif. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-[#c9a86a] transition-colors duration-300">
              Return to Top
            </a>
            <span className="w-1 h-1 rounded-full bg-[#c9a86a]/60 inline-block" />
            <a href="/projects" className="hover:text-[#c9a86a] transition-colors duration-300">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
