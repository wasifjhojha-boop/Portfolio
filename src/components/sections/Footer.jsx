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
    <footer className="relative bg-[#0a1628] pt-24 pb-12 overflow-hidden border-t-2 border-[#d4a13a]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#d4a13a]/10 pb-12">
          {/* Logo & Slogan */}
          <div className="text-center md:text-left">
            <h3 className="font-headings text-2xl md:text-3xl font-extrabold tracking-[0.2em] text-[#d4a13a] mb-4 drop-shadow-[0_2px_10px_rgba(212,161,58,0.3)]">
              MOHD WASIF
            </h3>
            <p className="text-[#8a8070] text-sm font-body max-w-sm tracking-wide">
              Performance marketing, technical SEO, and full-stack web development — charting growth one campaign and one build at a time.
            </p>
          </div>

          {/* Social Coordinates */}
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${contact.email}`}
              className="w-12 h-12 rounded-sm border border-[#d4a13a]/20 flex items-center justify-center text-[#8a8070] hover:text-[#d4a13a] hover:border-[#d4a13a] hover:-translate-y-1 transition-all duration-300 bg-[#0e3b4f]"
              aria-label="Email"
            >
              <FaEnvelope size={18} />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-[#d4a13a]/20 flex items-center justify-center text-[#8a8070] hover:text-[#d4a13a] hover:border-[#d4a13a] hover:-translate-y-1 transition-all duration-300 bg-[#0e3b4f]"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-[#d4a13a]/20 flex items-center justify-center text-[#8a8070] hover:text-[#d4a13a] hover:border-[#d4a13a] hover:-translate-y-1 transition-all duration-300 bg-[#0e3b4f]"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-[#d4a13a]/20 flex items-center justify-center text-[#8a8070] hover:text-[#d4a13a] hover:border-[#d4a13a] hover:-translate-y-1 transition-all duration-300 bg-[#0e3b4f]"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer pages" className="flex flex-wrap justify-center gap-x-6 gap-y-3 py-8 border-b border-[#d4a13a]/10">
          {pageLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[9px] font-headings font-bold tracking-[0.16em] uppercase text-[#8a8070] hover:text-[#d4a13a] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 text-center text-xs font-headings text-[#8a8070] tracking-widest uppercase">
          <p>© {currentYear} Mohd Wasif. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-[#d4a13a] transition-colors duration-300">
              Return to Top
            </a>
            <span className="text-[#d4a13a]">⚓</span>
            <a href="/projects" className="hover:text-[#d4a13a] transition-colors duration-300">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
