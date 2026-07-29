import './Marquee.css'

/**
 * Infinite scrolling text band.
 *
 * The track holds two identical copies of the list and slides exactly one
 * copy-width (-50%) before repeating, which is what makes the loop seamless
 * — any other distance produces a visible jump. The animation is pure CSS
 * keyframes on a transform, so it runs on the compositor and does not depend
 * on requestAnimationFrame, JS timers, or the smooth-scroll loop.
 *
 * The second copy is aria-hidden so screen readers announce the list once.
 */
export default function Marquee({
  items = [],
  speed = 38,
  separator = '✦',
  className = '',
}) {
  const Row = ({ hidden }) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="marquee__item">
          <span className="marquee__text">{item}</span>
          <span className="marquee__sep" aria-hidden="true">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track" style={{ '--marquee-duration': `${speed}s` }}>
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
