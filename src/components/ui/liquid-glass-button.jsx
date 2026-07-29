import './liquid-glass-button.css'

/**
 * Liquid-glass button.
 *
 * The refraction is a real SVG displacement filter applied to a blurred
 * backdrop layer, not a fake gradient — so whatever sits behind the button
 * genuinely bends at its edges. The filter host is rendered once per page
 * (see LiquidGlassFilter) and shared by every button.
 */
export function LiquidButton({
  children,
  className = '',
  size = 'md',
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag className={`lqbtn lqbtn--${size} ${className}`} {...props}>
      {/* Refracted backdrop */}
      <span className="lqbtn__glass" aria-hidden="true" />
      {/* Specular sheen along the top edge */}
      <span className="lqbtn__sheen" aria-hidden="true" />
      <span className="lqbtn__label">{children}</span>
    </Tag>
  )
}

/**
 * Shared SVG filter host. Mount once, near the root of any page that uses
 * LiquidButton. Kept separate so N buttons do not duplicate N filters.
 */
export function LiquidGlassFilter() {
  return (
    <svg className="lqbtn__filter-host" aria-hidden="true" focusable="false">
      <filter id="liquid-glass-displace" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="3" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="18"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

export default LiquidButton
