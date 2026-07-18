
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/navbar/Navbar'
import Hero from './components/sections/Hero'
import ShipScene from './components/sections/ShipScene'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Services from './components/sections/Services'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Certificates from './components/sections/Certificates'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

function HomePage() {
  return (
    <>
      <Hero />
      <ShipScene />
    </>
  )
}

const PAGES = {
  '/': HomePage,
  '/about': About,
  '/skills': Skills,
  '/services': Services,
  '/projects': Projects,
  '/experience': Experience,
  '/certificates': Certificates,
  '/testimonials': Testimonials,
  '/contact': Contact,
}

const PAGE_METADATA = {
  '/': {
    title: 'Mohd Wasif | Performance Marketing & Web Development',
    description: 'Portfolio of Mohd Wasif: performance marketing, technical SEO, paid ads, and modern web development.',
  },
  '/about': {
    title: 'About Mohd Wasif | Digital Growth Specialist',
    description: 'Learn about Mohd Wasif, a performance marketer and web developer focused on measurable digital growth.',
  },
  '/skills': {
    title: 'Skills | Mohd Wasif',
    description: 'Explore Mohd Wasif’s development, SEO, paid advertising, analytics, and conversion-optimization skills.',
  },
  '/services': {
    title: 'Services | Mohd Wasif',
    description: 'SEO, Google Ads, Meta Ads, web development, landing pages, and performance marketing services.',
  },
  '/projects': {
    title: 'Projects | Mohd Wasif',
    description: 'Selected web development, technical SEO, and performance marketing projects by Mohd Wasif.',
  },
  '/experience': {
    title: 'Experience | Mohd Wasif',
    description: 'Professional experience in performance marketing, SEO, and modern web development.',
  },
  '/certificates': {
    title: 'Certificates | Mohd Wasif',
    description: 'Professional certifications and credentials held by Mohd Wasif.',
  },
  '/testimonials': {
    title: 'Testimonials | Mohd Wasif',
    description: 'Client feedback on Mohd Wasif’s marketing and web development work.',
  },
  '/contact': {
    title: 'Contact Mohd Wasif | Start a Project',
    description: 'Contact Mohd Wasif for performance marketing, SEO, Google Ads, and website development projects.',
  },
}

function NotFoundPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#0d0b08]">
      <p className="eyebrow text-[#d4a13a] mb-4">Lost at Sea</p>
      <h1 className="font-headings text-4xl md:text-6xl font-bold text-[#f0e4c8] uppercase mb-6">Page Not Found</h1>
      <a href="/" className="px-6 py-3 bg-gradient-to-r from-[#d4a13a] to-[#d4a13a] text-[#0d0b08] font-label text-[10px] font-semibold tracking-[0.2em] uppercase">
        Return Home
      </a>
    </section>
  )
}

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll, driven by GSAP's own ticker so it
    // shares a single rAF loop with ScrollTrigger instead of two competing
    // loops (that mismatch is what caused the video scrub to stutter).
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      infinite: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const CurrentPage = PAGES[currentPath] || NotFoundPage

  useEffect(() => {
    const metadata = PAGE_METADATA[currentPath]
    if (!metadata) return

    document.title = metadata.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', metadata.description)
    window.scrollTo(0, 0)
  }, [currentPath])

  return (
    <div className="relative text-white w-full overflow-x-hidden font-body bg-[#0d0b08]">
      {/* Global Navigation */}
      <Navbar />

      {/* The selected page */}
      <main className="relative z-10 w-full bg-transparent">
        <CurrentPage />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
