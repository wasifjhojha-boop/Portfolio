import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { contact } from '../../content/contact'
import ThemeToggle from '../ui/ThemeToggle'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Landing', href: '/landing' },
  { label: '3D Lab', href: '/lab' },
  { label: 'About', href: '/about' },
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
          ? 'py-4 bg-transparent backdrop-blur-sm'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo — brand lockup (MW mark + wordmark) */}
        <a href="/" aria-label="Mohd Wasif — Home" className="group flex items-center">
          <svg
            viewBox="0 0 260 60"
            role="img"
            aria-label="Mohd Wasif Portfolio"
            className="h-9 w-auto opacity-95 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_2px_5px_rgba(201,168,106,0.35)]"
          >
            <g fill="none" strokeWidth="1.75" strokeLinecap="square" transform="translate(5,5) scale(0.5)">
              <path d="M18 78 V26 L38 56 L50 38" stroke="var(--foreground)" />
              <path d="M82 22 V74 L62 44 L50 62" stroke="#a8863f" />
            </g>
            <text x="70" y="31" fontFamily="Sora, sans-serif" fontWeight="700" fontSize="16" letterSpacing="3" fill="var(--foreground)">MOHD WASIF</text>
            <text x="70" y="47" fontFamily="Sora, sans-serif" fontWeight="400" fontSize="8" letterSpacing="4.5" fill="var(--muted)">PORTFOLIO</text>
          </svg>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={currentPath === item.href ? 'page' : undefined}
              className={`relative text-[11px] font-label font-medium tracking-[0.22em] uppercase transition-colors duration-300 py-1 group ${
                currentPath === item.href ? 'text-(--accent)' : 'text-(--muted) hover:text-(--accent)'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-[1px] bg-(--accent) transition-all duration-300 group-hover:w-full ${
                currentPath === item.href ? 'w-full' : 'w-0'
              }`} />
            </a>
          ))}
          <a
            href={contact.resume}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 border border-(--accent)/40 text-(--accent) font-label text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-gradient-to-r hover:from-(--accent) hover:to-(--accent) hover:text-[#ffffff] hover:border-(--accent) transition-all duration-400 rounded-sm"
          >
            Download CV
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`transition-colors duration-300 p-2 text-(--muted) hover:text-(--accent)`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slidedown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-(--background)/98 border-b border-(--accent)/20 px-6 py-6 flex flex-col gap-4 shadow-xl backdrop-blur-lg"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={`text-xs font-label font-medium py-3 tracking-[0.22em] uppercase border-b border-(--accent)/10 ${
                  currentPath === item.href ? 'text-(--accent)' : 'text-(--muted) hover:text-(--accent)'
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
              className="mt-4 text-center py-4 bg-gradient-to-r from-(--accent) to-(--accent) text-[#ffffff] font-label font-semibold rounded-sm tracking-[0.22em] uppercase border border-(--accent)"
            >
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
