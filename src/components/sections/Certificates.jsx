import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaStamp } from 'react-icons/fa'
import { certificates } from '../../content/certificates'

export default function Certificates() {
  return (
    <section id="certificates" className="relative w-full py-24 bg-[#1a1512] border-t border-[#d4a13a]/10 overflow-hidden ambient-ocean">
      {/* Decorative texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="eyebrow text-[#d4a13a] mb-4">
            VERIFIED CREDENTIALS
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4a13a]/50" />
            <span className="text-[#d4a13a] filter drop-shadow-[0_0_8px_rgba(212,161,58,0.7)] text-sm">✦</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4a13a]/50" />
          </div>
          <h2 className="font-headings text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-widest text-gold-gradient uppercase">
            Certificates
          </h2>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => {
            const link = cert.verifyUrl || cert.file || cert.image
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                className="card-lift p-8 rounded-sm flex flex-col relative overflow-hidden group shadow-lg bg-[#0d0b08] border border-[#d4a13a]/10"
              >
                {cert.image ? (
                  <div className="w-full aspect-[4/3] mb-6 rounded-sm overflow-hidden border border-[#d4a13a]/20 bg-[#1a1512]">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full border border-[#d4a13a]/40 bg-[#d4a13a]/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                    <FaStamp size={24} className="text-[#d4a13a]" />
                  </div>
                )}

                {/* Title & Issuer */}
                <div className="mb-4">
                  <h3 className="font-headings text-lg font-bold text-[#f0e4c8] tracking-wide leading-tight group-hover:text-[#d4a13a] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-[#8a8070] text-[9px] font-label tracking-[0.2em] uppercase mt-3">
                    {cert.issuer}{cert.date ? ` • ${cert.date}` : ''}
                  </p>
                  {cert.credentialId && (
                    <p className="text-[#8a8070] text-[9px] font-body mt-1">Credential ID: {cert.credentialId}</p>
                  )}
                </div>

                {/* View Credentials Anchor */}
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto flex items-center gap-2 text-[#8a8070] hover:text-[#f0e4c8] text-[10px] font-semibold font-label tracking-[0.2em] uppercase transition-colors"
                  >
                    <span>View Credential</span>
                    <FaExternalLinkAlt size={10} />
                  </a>
                ) : null}

                {/* Top border trim */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#d4a13a] opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
