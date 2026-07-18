import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaAnchor } from 'react-icons/fa'
import { contact } from '../../content/contact'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Journey', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'

  useEffect(() => {
    // Lenis smooth-scroll drives window.scrollY without reliably firing
    // native 'scroll' events, so a rAF poll is used instead of a listener.
    let rafId
    let wasScrolled = false

    const tick = () => {
      const scrolled = window.scrollY > 50
      if (scrolled !== wasScrolled) {
        wasScrolled = scrolled
        setIsScrolled(scrolled)
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-[#0d0b08]/90 backdrop-blur-lg border-b border-[#d4a13a]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 font-headings text-2xl font-bold tracking-[0.2em] text-[#d4a13a] hover:text-[#f0e4c8] transition-colors duration-300 drop-shadow-[0_2px_5px_rgba(212,161,58,0.5)]"
        >
          <FaAnchor className="text-xl" />
          <span>MW</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={currentPath === item.href ? 'page' : undefined}
              className={`relative text-[11px] font-label font-medium tracking-[0.22em] uppercase transition-colors duration-300 py-1 group ${
                currentPath === item.href ? 'text-[#d4a13a]' : 'text-[#8a8070] hover:text-[#d4a13a]'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-[1px] bg-[#d4a13a] transition-all duration-300 group-hover:w-full ${
                currentPath === item.href ? 'w-full' : 'w-0'
              }`} />
            </a>
          ))}
          <a
            href={contact.resume}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 border border-[#d4a13a]/40 text-[#d4a13a] font-label text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-gradient-to-r hover:from-[#d4a13a] hover:to-[#d4a13a] hover:text-[#0d0b08] hover:border-[#d4a13a] transition-all duration-400 rounded-sm"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#8a8070] hover:text-[#d4a13a] transition-colors duration-300 p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Slidedown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-[#0d0b08]/98 border-b border-[#d4a13a]/20 px-6 py-6 flex flex-col gap-4 shadow-xl backdrop-blur-lg"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={`text-xs font-label font-medium py-3 tracking-[0.22em] uppercase border-b border-[#d4a13a]/10 ${
                  currentPath === item.href ? 'text-[#d4a13a]' : 'text-[#8a8070] hover:text-[#d4a13a]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={contact.resume}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-4 text-center py-4 bg-gradient-to-r from-[#d4a13a] to-[#d4a13a] text-[#0d0b08] font-label font-semibold rounded-sm tracking-[0.22em] uppercase border border-[#d4a13a]"
            >
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
