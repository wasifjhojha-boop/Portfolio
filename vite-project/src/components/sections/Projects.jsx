import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaBookOpen, FaShieldAlt, FaScroll, FaChessKnight } from 'react-icons/fa'

const CATEGORIES = ['All', 'Engineering', 'Marketing', 'WordPress']

const PROJECTS = [
  {
    id: 1,
    title: 'JurisRoots — Legal Services Portal',
    category: 'Engineering',
    desc: 'A full-stack Delhi court-marriage services portal. Clients can register, create cases, upload documents, and follow each registration stage, while advocates manage cases and enquiries through an admin dashboard.',
    impact: 'Client dashboard, document uploads & admin case workflow.',
    github: 'https://github.com/wasifjhojha-boop/jurisroots',
    demo: 'https://jurisroots.vercel.app',
    color: '#4a6380', // Slate (Stark)
    icon: <FaShieldAlt size={40} className="text-white/10" />
  },
  {
    id: 2,
    title: 'Performance Marketing Dashboard',
    category: 'Engineering',
    desc: 'A full-stack React and Next.js interface that consolidates Google Ads, Meta Ads, and GA4 API feeds into a single unified analytics dashboard.',
    impact: 'Saved media buyers 8+ hours of reporting per week.',
    github: 'https://github.com',
    demo: 'https://example.com',
    color: '#7a6130', // Gold (Lannister)
    icon: <FaChessKnight size={40} className="text-white/10" />
  },
  {
    id: 3,
    title: 'B2B E-commerce Platform SEO',
    category: 'Marketing',
    desc: 'Enterprise-level SEO optimization campaign including schema injections, crawling fixes, rendering improvements, and keyword clusters strategy.',
    impact: 'Increased organic traffic by 280% in 6 months.',
    github: null,
    demo: 'https://example.com',
    color: '#8b2626', // Crimson (Targaryen)
    icon: <FaScroll size={40} className="text-white/10" />
  },
  {
    id: 4,
    title: 'Corporate Travel Portal',
    category: 'WordPress',
    desc: 'Fully bespoke WordPress website built from the ground up with custom theme layouts, custom post types, security integrations, and GTM tagging.',
    impact: 'Reduced load speed to 0.9s; +65% user retention.',
    github: null,
    demo: 'https://example.com',
    color: '#5a5020', // Amber (Baratheon)
    icon: <FaShieldAlt size={40} className="text-white/10" />
  },
  {
    id: 5,
    title: 'SaaS Customer Acquisition Funnel',
    category: 'Marketing',
    desc: 'Combined Google Search + Meta retargeting campaigns coupled with conversion-optimized landing pages. A/B tested headlines and form layouts.',
    impact: 'Lowered CPA (Cost Per Acquisition) by 32%.',
    github: null,
    demo: 'https://example.com',
    color: '#2a4a20', // Green (Tyrell)
    icon: <FaScroll size={40} className="text-white/10" />
  },
  {
    id: 6,
    title: 'Portfolio Engine (R3F Backdrop)',
    category: 'Engineering',
    desc: 'High-performance interactive landing page engine utilizing React Three Fiber, Custom GLSL shaders, and Lenis smooth-scrolling physics.',
    impact: 'Achieved 60fps on mobile with complex procedural meshes.',
    github: 'https://github.com',
    demo: 'https://example.com',
    color: '#3a4a5a', // Iron (Greyjoy)
    icon: <FaChessKnight size={40} className="text-white/10" />
  },
]

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filteredProjects = PROJECTS.filter(
    (project) => filter === 'All' || project.category === filter
  )

  return (
    <section id="projects" className="relative w-full py-24 bg-[#080605] overflow-hidden">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-headings text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase mb-4">
            THE FLEET & ARMORY
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <span className="text-[#c9a84c] filter drop-shadow-[0_0_8px_rgba(201,168,76,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-[#f5e6c8] uppercase">
            Featured Campaigns
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 border-y border-[#c9a84c]/20 font-headings text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent text-[#f5e6c8] border-[#c9a84c]/50'
                  : 'bg-transparent text-[#8a8070] hover:text-[#c9a84c] hover:border-[#c9a84c]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col p-[1px] rounded-sm bg-gradient-to-b from-[#c9a84c]/30 to-transparent overflow-hidden"
              >
                <div className="w-full h-full bg-[#0a0806] p-6 flex flex-col relative z-10">
                  {/* Visual Header / Mock UI Graphic */}
                  <div
                    className="w-full h-48 mb-6 bg-[#050403] relative overflow-hidden flex items-center justify-center border-b border-[#c9a84c]/10"
                    style={{ borderTop: `3px solid ${project.color}` }}
                  >
                    {/* Decorative mesh rings */}
                    <div className="absolute w-32 h-32 rounded-full border border-[#c9a84c]/5 -top-8 -right-8" />
                    <div className="absolute w-40 h-40 rounded-full border border-[#c9a84c]/5 -bottom-12 -left-12" />
                    
                    {/* Big category icon overlay */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    >
                      {project.icon}
                    </motion.div>

                    {/* Impact Stats Overlay */}
                    <div className="absolute inset-x-4 bottom-4 p-3 bg-[#0a0806]/90 backdrop-blur-sm border border-[#c9a84c]/20 flex items-center gap-3">
                      <FaScroll className="text-[#c9a84c] text-xs shrink-0" />
                      <span className="text-[10px] font-headings tracking-widest text-[#f5e6c8] leading-tight">
                        {project.impact}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h3 className="font-headings text-lg font-bold tracking-widest text-[#f5e6c8]">
                        {project.title}
                      </h3>
                    </div>
                    <div className="mb-4">
                       <span
                        className="px-3 py-1 text-[8px] font-bold font-headings tracking-[0.2em] uppercase"
                        style={{ color: project.color, border: `1px solid ${project.color}40`, backgroundColor: `${project.color}10` }}
                      >
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-[#8a8070] text-xs font-body leading-relaxed mb-6 tracking-wide flex-1">
                      {project.desc}
                    </p>

                    {/* Actions */}
                    <div className="mt-auto pt-4 border-t border-[#c9a84c]/10 flex items-center justify-between">
                      <button className="flex items-center gap-2 text-[#c9a84c] hover:text-[#f5e6c8] font-headings text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
                        <FaBookOpen size={11} />
                        <span>Read Chronicles</span>
                      </button>
                      
                      <div className="flex items-center gap-5 text-[#8a8070]">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#c9a84c] transition-colors"
                            title="View Archives"
                          >
                            <FaGithub size={16} />
                          </a>
                        )}
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#c9a84c] transition-colors"
                          title="Enter Realm"
                        >
                          <FaExternalLinkAlt size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Section Footer Ornament */}
        <div className="flex items-center justify-center gap-6 mt-20">
          <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/30" />
          <span className="text-[#c9a84c]/40 text-lg">⚔</span>
          <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/30" />
        </div>
      </div>
    </section>
  )
}
