
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/navbar/Navbar'
import Hero from './components/sections/Hero'
import HomeHighlights from './components/sections/HomeHighlights'
import SkillsMarquee from './components/sections/SkillsMarquee'
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
      <SkillsMarquee />
      <HomeHighlights />
    </>
  )
}

const PAGES = {
  '/': HomePage,
  '/lab': ShipScene,
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
    title: 'Mohd Wasif | Full-Stack Web Developer',
    description: 'Full-stack web developer in Delhi building fast, accessible React, Next.js, and WordPress sites — with technical SEO and performance marketing built in.',
  },
  '/lab': {
    title: '3D Lab | Mohd Wasif',
    description: 'An interactive WebGL scene built with React Three Fiber, Three.js, and custom GLSL shaders — running in real time in the browser.',
  },
  '/about': {
    title: 'About | Mohd Wasif',
    description: 'Mohd Wasif is a full-stack web developer in Delhi who came up through performance marketing, building sites that rank and convert.',
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
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#ffffff]">
      <p className="eyebrow text-[#a07d33] mb-4">404</p>
      <h1 className="font-headings text-4xl md:text-6xl font-bold text-[#191712] mb-6">Page Not Found</h1>
      <a href="/" className="px-6 py-3 bg-gradient-to-r from-[#a07d33] to-[#a07d33] text-[#ffffff] font-label text-[10px] font-semibold tracking-[0.2em] uppercase">
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
    <div className="relative text-[#191712] w-full overflow-x-hidden font-body bg-[#ffffff]">
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
