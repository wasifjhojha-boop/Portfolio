import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaScroll,
  FaChessKnight,
  FaHtml5,
  FaJs,
  FaReact,
  FaWordpress,
  FaCube,
  FaWind,
  FaBolt,
  FaMobileAlt,
  FaGoogle,
  FaFacebook,
  FaSearch,
  FaChartLine,
  FaTags,
  FaBullseye,
  FaStar,
} from 'react-icons/fa'

const DEVELOPMENT_SKILLS = [
  { name: 'HTML5 / CSS3', level: 'Expert', desc: 'Semantic, accesssible layouts.' },
  { name: 'JavaScript (ES6+)', level: 'Expert', desc: 'Asynchronous logic and DOM.' },
  { name: 'React', level: 'Expert', desc: 'SPA state and hooks.' },
  { name: 'Next.js', level: 'Advanced', desc: 'SSR, SSG, routing architectures.' },
  { name: 'Three.js / R3F', level: 'Intermediate', desc: 'Procedural 3D backdrops.' },
  { name: 'Tailwind CSS', level: 'Expert', desc: 'Utility styles and variables.' },
  { name: 'WordPress', level: 'Expert', desc: 'Custom themes, templates, plugins.' },
  { name: 'Vite', level: 'Expert', desc: 'Fast client builds and configs.' },
  { name: 'Responsive Design', level: 'Expert', desc: 'Multi-screen consistency.' },
]

const MARKETING_SKILLS = [
  { name: 'Google Ads', level: 'Expert', desc: 'Search, Display, Performance Max.' },
  { name: 'Meta Ads', level: 'Expert', desc: 'Facebook & Instagram campaigns.' },
  { name: 'SEO (Search Engine Optimization)', level: 'Expert', desc: 'Technical audits, content, backlink strategy.' },
  { name: 'GA4 (Google Analytics)', level: 'Advanced', desc: 'Custom event setups and attribution.' },
  { name: 'Google Tag Manager', level: 'Advanced', desc: 'Trigger logic and pixel configuration.' },
  { name: 'Conversion Rate Optimization (CRO)', level: 'Expert', desc: 'Landing page A/B tests & user maps.' },
]

// Presentation helpers (no data change) ────────────────────────────────
const SKILL_ICONS = {
  'HTML5 / CSS3': FaHtml5,
  'JavaScript (ES6+)': FaJs,
  React: FaReact,
  'Next.js': FaReact,
  'Three.js / R3F': FaCube,
  'Tailwind CSS': FaWind,
  WordPress: FaWordpress,
  Vite: FaBolt,
  'Responsive Design': FaMobileAlt,
  'Google Ads': FaGoogle,
  'Meta Ads': FaFacebook,
  'SEO (Search Engine Optimization)': FaSearch,
  'GA4 (Google Analytics)': FaChartLine,
  'Google Tag Manager': FaTags,
  'Conversion Rate Optimization (CRO)': FaBullseye,
}

const LEVEL_PERCENT = { Expert: 100, Advanced: 80, Intermediate: 60 }

const TABS = [
  { id: 'engineering', label: 'Engineering Arsenal', icon: <FaChessKnight /> },
  { id: 'campaigns', label: 'Campaign Weapons', icon: <FaScroll /> },
]

// Framer Motion variants ────────────────────────────────────────────────
const headerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const headerItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function SkillCard({ skill }) {
  const Icon = SKILL_ICONS[skill.name] || FaStar
  const percent = LEVEL_PERCENT[skill.level] ?? 50

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="p-6 rounded-sm relative overflow-hidden group shadow-lg bg-[#0a0806] border border-[#c9a84c]/10 hover:border-[#c9a84c]/40 hover:shadow-[0_10px_40px_rgba(201,168,76,0.15)] transition-colors duration-300"
    >
      {/* Top sheen on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(120deg,transparent_30%,rgba(201,168,76,0.08)_50%,transparent_70%)]" />

      {/* Corner ornament on hover */}
      <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#c9a84c]/0 group-hover:border-[#c9a84c]/50 transition-colors duration-500" />

      {/* Header row: icon + name + level badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-[#c9a84c] text-lg filter drop-shadow-[0_0_8px_rgba(201,168,76,0.4)] group-hover:scale-110 transition-transform duration-300">
            <Icon />
          </span>
          <h4 className="font-headings text-lg font-bold text-[#f5e6c8] group-hover:text-[#c9a84c] transition-colors duration-300">
            {skill.name}
          </h4>
        </div>
        <span className="px-3 py-1 rounded-sm bg-[#c9a84c]/10 text-[#c9a84c] text-[9px] font-bold tracking-[0.1em] uppercase border border-[#c9a84c]/20 shrink-0">
          {skill.level}
        </span>
      </div>

      <p className="text-[#8a8070] text-xs font-body tracking-wide leading-relaxed relative z-10">
        {skill.desc}
      </p>

      {/* Proficiency bar */}
      <div className="mt-5 h-[3px] w-full bg-[#c9a84c]/10 rounded-full overflow-hidden relative z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#c9a84c] to-[#f5e6c8] rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </div>

      {/* Bottom accent line grows on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#f5e6c8] group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('engineering')
  const skills = activeTab === 'engineering' ? DEVELOPMENT_SKILLS : MARKETING_SKILLS

  return (
    <section id="skills" className="relative w-full py-24 bg-[#080605] overflow-hidden">
      {/* Ambient background textures */}
      <div className="absolute inset-0 opacity-[0.045] pointer-events-none bg-repeat bg-[size:220px] bg-[image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_300_300%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.65)_100%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.p
            variants={headerItem}
            className="font-headings text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase mb-4"
          >
            THE GRAND MAESTER'S KNOWLEDGE
          </motion.p>
          <motion.div variants={headerItem} className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            <motion.span
              className="text-[#c9a84c] filter drop-shadow-[0_0_8px_rgba(201,168,76,0.7)] text-sm"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✦
            </motion.span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
          </motion.div>
          <motion.h2
            variants={headerItem}
            className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-[#f5e6c8] uppercase"
          >
            Skills Treasury
          </motion.h2>
        </motion.div>

        {/* Custom Tabs Navigation */}
        <div className="flex justify-center gap-6 mb-16">
          {TABS.map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 font-headings text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 border-y flex items-center gap-2 ${active
                  ? 'border-[#c9a84c]/50 text-[#f5e6c8]'
                  : 'border-transparent text-[#8a8070] hover:text-[#c9a84c] hover:border-[#c9a84c]/20'
                  }`}
              >
                {active && (
                  <motion.span
                    layoutId="skillTabBg"
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
