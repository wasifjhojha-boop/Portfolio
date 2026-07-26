import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import { projects } from '../../content/projects'
import { contact } from '../../content/contact'

// Real campaign numbers, pulled from the Muqeem & Brothers case study.
// Kept as hard figures because measurable results are the strongest proof
// a performance marketer can lead with.
const METRICS = [
  { value: '1.94M', label: 'Ad Impressions Served' },
  { value: '73.5K', label: 'Video Views Driven' },
  { value: '₹18.71', label: 'Lowest Cost Per Click' },
  { value: '20+', label: 'Websites Delivered' },
]

// The three fully-documented case studies lead the home page.
const FEATURED = projects.filter((p) => p.status === 'detailed').slice(0, 3)

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export default function HomeHighlights() {
  return (
    <>
      {/* ── Proof strip ── */}
      <section
        aria-label="Results at a glance"
        className="relative w-full bg-[#0d0b08] border-t border-[#d4a13a]/10 py-20 md:py-24 ambient-ocean overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-14">
            <p className="eyebrow text-[#d4a13a] mb-4">Proof In The Numbers</p>
            <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-gold-gradient uppercase">
              Measurable Results
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-headings text-3xl md:text-5xl font-extrabold text-[#d4a13a] drop-shadow-[0_2px_12px_rgba(212,161,58,0.25)]">
                  {m.value}
                </p>
                <p className="font-label text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#8a8070] mt-3 leading-snug">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      <section
        aria-label="Selected work"
        className="relative w-full bg-[#0d0b08] border-t border-[#d4a13a]/10 py-20 md:py-24 ambient-ocean overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-14 md:mb-16">
            <p className="eyebrow text-[#d4a13a] mb-4">Selected Work</p>
            <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-gold-gradient uppercase">
              Recent Voyages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURED.map((p, i) => (
              <motion.article
                key={p.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel card-lift rounded-sm overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1512]">
                  {/* Not lazy-loaded: native lazy loading does not reliably
                      trigger inside the GSAP-pinned page flow, leaving the
                      cards blank. Only three small images, so eager is fine. */}
                  <img
                    src={p.image}
                    alt={p.title}
                    decoding="async"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#0d0b08]/80 backdrop-blur-sm text-[8px] font-label font-semibold tracking-[0.2em] uppercase text-[#d4a13a] rounded-sm">
                    {p.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-headings text-base font-bold tracking-wide text-[#f0e4c8] leading-snug mb-3">
                    {p.title}
                  </h3>
                  <p className="font-body text-xs text-[#8a8070] leading-relaxed mb-5 flex-1">
                    {p.story?.[0]?.slice(0, 130)}…
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[8px] font-label tracking-[0.15em] uppercase text-[#8a8070] border border-[#d4a13a]/15 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/projects"
              className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#d4a13a]/40 text-[#f0e4c8] font-label font-semibold text-[10px] tracking-[0.22em] uppercase hover:bg-[#d4a13a]/10 hover:border-[#d4a13a] hover:text-[#d4a13a] transition-all duration-300 rounded-sm"
            >
              View All Projects
              <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section
        aria-label="Start a project"
        className="relative w-full bg-[#0d0b08] border-t border-[#d4a13a]/10 py-24 md:py-28 ambient-ocean overflow-hidden"
      >
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="eyebrow text-[#d4a13a] mb-5">Drop Anchor</p>
          <h2 className="font-headings text-3xl md:text-5xl font-extrabold tracking-widest text-gold-gradient uppercase mb-6">
            Let&apos;s Build Something
          </h2>
          <p className="font-body text-sm md:text-base text-[#8a8070] leading-relaxed mb-10">
            Whether you need campaigns that convert, a site that ranks, or a build that does both —
            I&apos;d like to hear what you&apos;re working on.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 rounded-sm bg-gradient-to-br from-[#e8c97a] via-[#d4a13a] to-[#b8862a] text-[#0d0b08] font-label font-semibold text-[10px] tracking-[0.22em] uppercase shadow-[0_8px_24px_-8px_rgba(212,161,58,0.6)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(212,161,58,0.7)] transition-all duration-300"
            >
              Start a Project
            </a>
            <a
              href={contact.resume}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-sm border border-[#d4a13a]/40 text-[#f0e4c8] font-label font-semibold text-[10px] tracking-[0.22em] uppercase hover:bg-[#d4a13a]/10 hover:border-[#d4a13a] hover:text-[#d4a13a] hover:-translate-y-0.5 transition-all duration-300"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
