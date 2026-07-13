import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaChessRook } from 'react-icons/fa'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Archives', href: '/about' },
  { label: 'Treasury', href: '/skills' },
  { label: 'Services', href: '/services' },
  { label: 'Armory', href: '/projects' },
  { label: 'Chronicles', href: '/experience' },
  { label: 'Alliances', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-[#050403]/90 backdrop-blur-md border-b border-[#c9a84c]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 font-headings text-2xl font-bold tracking-[0.2em] text-[#c9a84c] hover:text-[#f5e6c8] transition-colors duration-300 drop-shadow-[0_2px_5px_rgba(201,168,76,0.5)]"
        >
          <FaChessRook className="text-xl" />
          <span>MW</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={currentPath === item.href ? 'page' : undefined}
              className={`relative text-[10px] font-headings font-bold tracking-[0.2em] uppercase transition-colors duration-300 py-1 group ${
                currentPath === item.href ? 'text-[#c9a84c]' : 'text-[#8a8070] hover:text-[#c9a84c]'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-[1px] bg-[#c9a84c] transition-all duration-300 group-hover:w-full ${
                currentPath === item.href ? 'w-full' : 'w-0'
              }`} />
            </a>
          ))}
          <a
            href="/contact"
            className="px-5 py-2 border border-[#c9a84c]/40 text-[#c9a84c] font-headings text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-gradient-to-r hover:from-[#c9a84c] hover:to-[#d4af37] hover:text-[#050403] hover:border-[#c9a84c] transition-all duration-400 rounded-sm"
          >
            SUMMON THE LORD
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#8a8070] hover:text-[#c9a84c] transition-colors duration-300 p-2"
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
            className="lg:hidden w-full bg-[#050403]/98 border-b border-[#c9a84c]/20 px-6 py-6 flex flex-col gap-4 shadow-xl backdrop-blur-lg"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={`text-xs font-headings font-bold py-3 tracking-[0.2em] uppercase border-b border-[#c9a84c]/10 ${
                  currentPath === item.href ? 'text-[#c9a84c]' : 'text-[#8a8070] hover:text-[#c9a84c]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 text-center py-4 bg-gradient-to-r from-[#c9a84c] to-[#d4af37] text-[#050403] font-headings font-bold rounded-sm tracking-[0.2em] uppercase border border-[#c9a84c]"
            >
              SUMMON THE LORD
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
