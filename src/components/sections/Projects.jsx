import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaBookOpen, FaShieldAlt, FaScroll, FaChessKnight, FaShopify, FaChevronDown } from 'react-icons/fa'
import { projects, demoWebsites } from '../../content/projects'

const CATEGORIES = ['All', 'Engineering', 'Marketing', 'WordPress']

const CARD_STYLE = {
  jurisroots: { color: '#4a6380', icon: FaShieldAlt },
  'muqeem-brothers': { color: '#7a6130', icon: FaChessKnight },
  flowzle: { color: '#5a9e48', icon: FaShopify },
  'google-sites-business': { color: '#5a5020', icon: FaShieldAlt },
  'scrap-traders': { color: '#8b2626', icon: FaScroll },
  lineardial: { color: '#3a4a5a', icon: FaChessKnight },
  'ethnic-wear': { color: '#7a1a1a', icon: FaScroll },
  'pet-shop': { color: '#2a4a20', icon: FaShieldAlt },
}

function impactLine(project) {
  if (project.status === 'detailed') return project.results[0]
  return 'Full case study coming soon'
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const style = CARD_STYLE[project.id] || { color: '#d4a13a', icon: FaScroll }
  const Icon = style.icon
  const isDetailed = project.status === 'detailed'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col p-[1px] rounded-sm bg-gradient-to-b from-[#d4a13a]/30 to-transparent overflow-hidden"
    >
      <div className="w-full h-full bg-[#1a1512] p-6 flex flex-col relative z-10">
        {/* Visual Header */}
        <div
          className="w-full h-48 mb-6 bg-[#0d0b08] relative overflow-hidden flex items-center justify-center border-b border-[#d4a13a]/10 cursor-pointer"
          style={{ borderTop: `3px solid ${style.color}` }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/95 via-[#0d0b08]/25 to-[#0d0b08]/10" />
            </>
          ) : (
            <>
              <div className="absolute w-32 h-32 rounded-full border border-[#d4a13a]/5 -top-8 -right-8" />
              <div className="absolute w-40 h-40 rounded-full border border-[#d4a13a]/5 -bottom-12 -left-12" />
            </>
          )}

          <AnimatePresence mode="wait">
            {!hovered ? (
              project.image ? null : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <Icon size={40} className="text-white/10" />
                </motion.div>
              )
            ) : (
              <motion.p
                key="desc"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="relative px-6 text-center text-[#f0e4c8] text-xs font-body leading-relaxed"
              >
                {project.story ? project.story[0] : `${project.category} — ${project.topics.join(', ')}`}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Impact Stats Overlay */}
          <div className="absolute inset-x-4 bottom-4 p-3 bg-[#1a1512]/90 backdrop-blur-sm border border-[#d4a13a]/20 flex items-center gap-3">
            <FaScroll className="text-[#d4a13a] text-xs shrink-0" />
            <span className="text-[10px] font-headings tracking-widest text-[#f0e4c8] leading-tight">
              {impactLine(project)}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="font-headings text-lg font-bold tracking-widest text-[#f0e4c8]">
              {project.title}
            </h3>
          </div>
          <div className="mb-4">
            <span
              className="px-3 py-1 text-[8px] font-bold font-headings tracking-[0.2em] uppercase"
              style={{ color: style.color, border: `1px solid ${style.color}40`, backgroundColor: `${style.color}10` }}
            >
              {project.category}
            </span>
          </div>

          {isDetailed ? (
            <p className="text-[#8a8070] text-xs font-body leading-relaxed mb-6 tracking-wide flex-1">
              {project.story[0]}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 mb-6 flex-1">
              {project.topics.map((t) => (
                <span key={t} className="text-[10px] font-body text-[#8a8070] bg-[#0d0b08] px-2 py-1 rounded-sm">{t}</span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto pt-4 border-t border-[#d4a13a]/10 flex items-center justify-between">
            {isDetailed ? (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-2 text-[#d4a13a] hover:text-[#f0e4c8] font-headings text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
              >
                <FaBookOpen size={11} />
                <span>Full Case Study</span>
                <FaChevronDown size={9} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <span className="text-[10px] font-headings tracking-[0.2em] uppercase text-[#8a8070]/50 italic">Coming Soon</span>
            )}

            <div className="flex items-center gap-5 text-[#8a8070]">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-[#d4a13a] transition-colors" title="View Code">
                  <FaGithub size={16} />
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="hover:text-[#d4a13a] transition-colors" title="View Demo">
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Full Case Study */}
        <AnimatePresence>
          {isDetailed && expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-2 border-t border-[#d4a13a]/10 space-y-5">
                {project.story.slice(1).map((p, i) => (
                  <p key={i} className="text-[#8a8070] text-xs font-body leading-relaxed">{p}</p>
                ))}

                <div>
                  <h4 className="font-headings text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4a13a] mb-2">Responsibilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.responsibilities.map((r) => (
                      <span key={r} className="text-[10px] font-body text-[#8a8070] bg-[#0d0b08] px-2 py-1 rounded-sm">{r}</span>
                    ))}
                  </div>
                </div>

                {project.seoKeywords && (
                  <div>
                    <h4 className="font-headings text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4a13a] mb-2">SEO Target Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.seoKeywords.map((k) => (
                        <span key={k} className="text-[10px] font-body text-[#8a8070] bg-[#0d0b08] px-2 py-1 rounded-sm">{k}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-headings text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4a13a] mb-2">Challenges</h4>
                  <ul className="text-[#8a8070] text-xs font-body list-disc list-inside space-y-1">
                    {project.challenges.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="font-headings text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4a13a] mb-2">Results</h4>
                  <ul className="text-[#f0e4c8]/80 text-xs font-body list-disc list-inside space-y-1">
                    {project.results.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="font-headings text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4a13a] mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t) => (
                      <span key={t} className="text-[10px] font-body text-[#d4a13a] bg-[#d4a13a]/10 border border-[#d4a13a]/20 px-2 py-1 rounded-sm">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filteredProjects = projects.filter(
    (project) => filter === 'All' || project.category === filter
  )

  return (
    <section id="projects" className="relative w-full py-24 bg-[#0d0b08] overflow-hidden ambient-ocean">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-headings text-[10px] tracking-[0.5em] text-[#d4a13a] uppercase mb-4">
            THE VOYAGE LOG
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4a13a]/50" />
            <span className="text-[#d4a13a] filter drop-shadow-[0_0_8px_rgba(212,161,58,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4a13a]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase">
            Featured Projects
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 border-y border-[#d4a13a]/20 font-headings text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-transparent via-[#d4a13a]/20 to-transparent text-[#f0e4c8] border-[#d4a13a]/50'
                  : 'bg-transparent text-[#8a8070] hover:text-[#d4a13a] hover:border-[#d4a13a]/40'
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
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Demo Websites */}
        <h3 className="font-headings text-lg font-bold tracking-widest text-[#f0e4c8]/70 mt-24 mb-8 text-center uppercase">
          Demo Websites
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {demoWebsites.map((name) => (
            <div
              key={name}
              className="aspect-square flex items-center justify-center text-center p-3 bg-[#1a1512]/20 border border-[#d4a13a]/5 rounded-sm text-[#8a8070] text-xs font-body"
            >
              {name}
            </div>
          ))}
        </div>
        <p className="text-center text-[#8a8070]/50 text-[10px] font-body italic mt-4">
          Live previews and screenshots coming soon.
        </p>

        {/* Section Footer Ornament */}
        <div className="flex items-center justify-center gap-6 mt-20">
          <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-[#d4a13a]/30" />
          <span className="text-[#d4a13a]/40 text-lg">⚓</span>
          <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-[#d4a13a]/30" />
        </div>
      </div>
    </section>
  )
}
