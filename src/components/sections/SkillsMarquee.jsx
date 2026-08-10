import Marquee from '../ui/Marquee'
import { developmentSkills, marketingSkills } from '../../content/tools'

// Real skill names, not filler — engineering and marketing interleaved so
// the band reads as one practice rather than two separate lists.
const WORDS = (() => {
  const dev = developmentSkills.map((s) => s.name)
  const mkt = marketingSkills.map((s) => s.name)
  const out = []
  const max = Math.max(dev.length, mkt.length)
  for (let i = 0; i < max; i++) {
    if (dev[i]) out.push(dev[i])
    if (mkt[i]) out.push(mkt[i])
  }
  return out
})()

export default function SkillsMarquee() {
  return (
    <section
      aria-label="Skills"
      className="relative w-full bg-(--card) py-8 md:py-10 border-y border-(--accent)/15"
    >
      <Marquee
        items={WORDS}
        speed={42}
        className="font-headings text-2xl md:text-4xl font-bold uppercase tracking-tight text-(--foreground)/85"
      />
    </section>
  )
}
