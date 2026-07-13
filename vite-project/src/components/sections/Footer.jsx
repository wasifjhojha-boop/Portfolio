import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

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
    <footer className="relative bg-[#050403] pt-24 pb-12 overflow-hidden border-t-2 border-[#c9a84c]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#c9a84c]/10 pb-12">
          {/* Logo & Slogan */}
          <div className="text-center md:text-left">
            <h3 className="font-headings text-2xl md:text-3xl font-extrabold tracking-[0.2em] text-[#c9a84c] mb-4 drop-shadow-[0_2px_10px_rgba(201,168,76,0.3)]">
              MOHD WASIF
            </h3>
            <p className="text-[#8a8070] text-sm font-body max-w-sm tracking-wide">
              Forging digital empires. Charting paths to market dominion through high-performance ads, masterclass SEO, and modern engineering architecture.
            </p>
          </div>

          {/* Social Coordinates */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:wasifkhan987@gmail.com"
              className="w-12 h-12 rounded-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#8a8070] hover:text-[#c9a84c] hover:border-[#c9a84c] hover:-translate-y-1 transition-all duration-300 bg-[#0a0806]"
              aria-label="Email"
            >
              <FaEnvelope size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohd-wasif1/"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#8a8070] hover:text-[#c9a84c] hover:border-[#c9a84c] hover:-translate-y-1 transition-all duration-300 bg-[#0a0806]"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://github.com/wasifjhojha-boop/jurisroots"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#8a8070] hover:text-[#c9a84c] hover:border-[#c9a84c] hover:-translate-y-1 transition-all duration-300 bg-[#0a0806]"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://wa.me/917834823577"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-sm border border-[#c9a84c]/20 flex items-center justify-center text-[#8a8070] hover:text-[#c9a84c] hover:border-[#c9a84c] hover:-translate-y-1 transition-all duration-300 bg-[#0a0806]"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer pages" className="flex flex-wrap justify-center gap-x-6 gap-y-3 py-8 border-b border-[#c9a84c]/10">
          {pageLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[9px] font-headings font-bold tracking-[0.16em] uppercase text-[#8a8070] hover:text-[#c9a84c] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 text-center text-xs font-headings text-[#8a8070] tracking-widest uppercase">
          <p>© {currentYear} MOHD WASIF. All rights reserved. Forged with code & iron.</p>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-[#c9a84c] transition-colors duration-300">
              Return to Top
            </a>
            <span className="text-[#c9a84c]">✦</span>
            <a href="/projects" className="hover:text-[#c9a84c] transition-colors duration-300">
              View The Armory
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
