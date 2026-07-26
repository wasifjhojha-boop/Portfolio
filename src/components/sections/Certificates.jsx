import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaStamp } from 'react-icons/fa'
import { certificates } from '../../content/certificates'

export default function Certificates() {
  return (
    <section id="certificates" className="relative w-full py-24 bg-[#f7f5f0] border-t border-[#a07d33]/10 overflow-hidden ambient-ocean">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="eyebrow text-[#a07d33] mb-4">
            VERIFIED CREDENTIALS
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#a07d33]/50" />
            <span className="w-1 h-1 rounded-full bg-[#a07d33]/60" />
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#a07d33]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase">
            Certificates
          </h2>
        </div>

        {/* Horizontal snap rail. tabindex + role make the scroll region
            reachable and operable by keyboard, which a plain overflow
            container is not. */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Certificates — horizontally scrollable list"
          className="no-scrollbar -mx-6 md:-mx-12 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-6 md:px-12 pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a07d33]"
        >
          {certificates.map((cert, idx) => {
            const link = cert.verifyUrl || cert.file || cert.image
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                className="card-lift p-8 rounded-sm flex flex-col relative overflow-hidden group shadow-lg bg-[#ffffff] border border-[#a07d33]/10 w-[78vw] sm:w-[22rem] shrink-0 snap-start"
              >
                {cert.image ? (
                  <div className="w-full aspect-[4/3] mb-6 rounded-sm overflow-hidden border border-[#a07d33]/20 bg-[#f7f5f0]">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      decoding="async"
                      className="w-full h-full object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full border border-[#a07d33]/40 bg-[#a07d33]/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                    <FaStamp size={24} className="text-[#a07d33]" />
                  </div>
                )}

                {/* Title & Issuer */}
                <div className="mb-4">
                  <h3 className="font-headings text-lg font-bold text-[#191712] tracking-wide leading-tight group-hover:text-[#a07d33] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-[#5f594c] text-[9px] font-label tracking-[0.2em] uppercase mt-3">
                    {cert.issuer}{cert.date ? ` • ${cert.date}` : ''}
                  </p>
                  {cert.credentialId && (
                    <p className="text-[#5f594c] text-[9px] font-body mt-1">Credential ID: {cert.credentialId}</p>
                  )}
                </div>

                {/* View Credentials Anchor */}
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto flex items-center gap-2 text-[#5f594c] hover:text-[#191712] text-[10px] font-semibold font-label tracking-[0.2em] uppercase transition-colors"
                  >
                    <span>View Credential</span>
                    <FaExternalLinkAlt size={10} />
                  </a>
                ) : null}

                {/* Top border trim */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#a07d33] opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
        </div>

        {/* Affordance: a horizontal rail is easy to miss without one. */}
        <p className="mt-6 flex items-center gap-2 font-label text-[10px] tracking-[0.28em] uppercase text-[#8c8577]">
          <span className="h-px w-8 bg-[#a07d33]/40" />
          Scroll for more
        </p>
      </div>
    </section>
  )
}
