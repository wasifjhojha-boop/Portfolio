import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaScroll,
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
  FaShopify,
} from 'react-icons/fa'
import { developmentSkills, marketingSkills, aiTools } from '../../content/tools'

// Presentation helpers (no data change) ────────────────────────────────
const SKILL_ICONS = {
  React: FaReact,
  'Next.js': FaReact,
  'Tailwind CSS': FaWind,
  'Three.js / React Three Fiber': FaCube,
  'GSAP / Framer Motion': FaBolt,
  WordPress: FaWordpress,
  Shopify: FaShopify,
  'Google Sites': FaMobileAlt,
  'Google Ads': FaGoogle,
  'Meta Ads': FaFacebook,
  'Technical SEO': FaSearch,
  Analytics: FaChartLine,
  Content: FaScroll,
  'Conversion Rate Optimization': FaBullseye,
}

const TOOL_LEVEL_STYLE = {
  'Core Skill': 'bg-[#d4a13a]/15 text-[#d4a13a] border-[#d4a13a]/40',
  Advanced: 'bg-[#f0e4c8]/10 text-[#f0e4c8]/80 border-[#f0e4c8]/20',
  'Currently Learning': 'bg-[#1a1512]/60 text-[#f0e4c8]/50 border-[#f0e4c8]/10',
}

const LEVEL_PERCENT = { Expert: 100, Advanced: 80, Intermediate: 60 }

const TABS = [
  { id: 'engineering', label: 'Engineering', icon: <FaBolt /> },
  { id: 'campaigns', label: 'Marketing', icon: <FaScroll /> },
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
      className="p-6 rounded-sm relative overflow-hidden group shadow-lg bg-[#1a1512] border border-[#d4a13a]/10 hover:border-[#d4a13a]/40 hover:shadow-[0_10px_40px_rgba(212,161,58,0.15)] transition-colors duration-300"
    >
      {/* Top sheen on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(120deg,transparent_30%,rgba(212,161,58,0.08)_50%,transparent_70%)]" />

      {/* Corner ornament on hover */}
      <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#d4a13a]/0 group-hover:border-[#d4a13a]/50 transition-colors duration-500" />

      {/* Header row: icon + name + level badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-[#d4a13a] text-lg filter drop-shadow-[0_0_8px_rgba(212,161,58,0.4)] group-hover:scale-110 transition-transform duration-300">
            <Icon />
          </span>
          <h4 className="font-headings text-lg font-bold text-[#f0e4c8] group-hover:text-[#d4a13a] transition-colors duration-300">
            {skill.name}
          </h4>
        </div>
        <span className="px-3 py-1 rounded-sm bg-[#d4a13a]/10 text-[#d4a13a] text-[9px] font-bold tracking-[0.1em] uppercase border border-[#d4a13a]/20 shrink-0">
          {skill.level}
        </span>
      </div>

      <p className="text-[#8a8070] text-xs font-body tracking-wide leading-relaxed relative z-10">
        {skill.desc}
      </p>

      {/* Proficiency bar */}
      <div className="mt-5 h-[3px] w-full bg-[#d4a13a]/10 rounded-full overflow-hidden relative z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#d4a13a] to-[#f0e4c8] rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </div>

      {/* Bottom accent line grows on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#d4a13a] to-[#f0e4c8] group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('engineering')
  const skills = activeTab === 'engineering' ? developmentSkills : marketingSkills

  return (
    <section id="skills" className="relative w-full py-24 bg-[#0d0b08] overflow-hidden">
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
            className="eyebrow text-[#d4a13a] mb-4"
          >
            THE TREASURY
          </motion.p>
          <motion.div variants={headerItem} className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4a13a]/50" />
            <motion.span
              className="text-[#d4a13a] filter drop-shadow-[0_0_8px_rgba(212,161,58,0.7)] text-sm"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✦
            </motion.span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4a13a]/50" />
          </motion.div>
          <motion.h2
            variants={headerItem}
            className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase"
          >
            Skills
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
                className={`relative px-6 py-3 font-label text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 border-y flex items-center gap-2 ${active
                  ? 'border-[#d4a13a]/50 text-[#f0e4c8]'
                  : 'border-transparent text-[#8a8070] hover:text-[#d4a13a] hover:border-[#d4a13a]/20'
                  }`}
              >
                {active && (
                  <motion.span
                    layoutId="skillTabBg"
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-[#d4a13a]/20 to-transparent"
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

        {/* AI & Automation Toolkit */}
        <div className="mt-24">
          <h3 className="font-headings text-xl md:text-2xl font-bold tracking-widest text-[#d4a13a] mb-10 text-center uppercase">
            AI &amp; Automation Toolkit
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiTools.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (gi % 2) * 0.08 }}
                className="card-lift p-6 bg-[#1a1512]/40 border border-[#d4a13a]/10 rounded-sm"
              >
                <h4 className="font-headings text-xs font-bold tracking-[0.2em] uppercase text-[#f0e4c8] mb-4">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className={`px-3 py-1.5 rounded-sm text-[10px] font-body border ${TOOL_LEVEL_STYLE[tool.level]}`}
                      title={tool.level}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
