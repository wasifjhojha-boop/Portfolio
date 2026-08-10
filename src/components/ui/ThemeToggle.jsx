import { useSyncExternalStore } from 'react'
import { getThemeSnapshot, subscribeTheme } from '../../lib/theme'

const STORAGE_KEY = 'theme'

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem(STORAGE_KEY, theme)
  window.dispatchEvent(new Event('themechange'))
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Cinematic circular reveal: a fixed veil clipped to an expanding circle
// centered on the click point, passing through a dark-gray/accent-red
// tone before the new theme (already applied underneath) is uncovered.
// Web Animations API — works the same in every evergreen browser, no
// experimental View Transitions API dependency.
function playTransition(originX, originY, nextTheme) {
  if (prefersReducedMotion()) {
    applyTheme(nextTheme)
    return
  }

  const veil = document.createElement('div')
  veil.className = 'theme-transition-veil'
  document.body.appendChild(veil)

  const radius = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY)
  )

  const clipFrom = `circle(0px at ${originX}px ${originY}px)`
  const clipTo = `circle(${radius}px at ${originX}px ${originY}px)`

  const expand = veil.animate(
    [
      { clipPath: clipFrom, opacity: 0.9 },
      { clipPath: clipTo, opacity: 0.9 },
    ],
    { duration: 600, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
  )

  // Swap the theme once the veil has covered the viewport, then fade the
  // veil out to reveal the new palette underneath. A timeout backstop
  // guarantees this fires even if the Animation API stalls (e.g. the tab
  // is backgrounded mid-transition) — without it, a stuck onfinish would
  // leave the veil covering the screen and the theme never switching.
  let settled = false
  const settle = () => {
    if (settled) return
    settled = true
    applyTheme(nextTheme)
    const fade = veil.animate([{ opacity: 0.9 }, { opacity: 0 }], {
      duration: 200,
      easing: 'ease-out',
      fill: 'forwards',
    })
    fade.onfinish = () => veil.remove()
    // Belt-and-suspenders: if the fade itself never fires, remove after
    // its duration anyway so the veil can't get stuck.
    setTimeout(() => veil.remove(), 400)
  }

  expand.onfinish = settle
  setTimeout(settle, 700)
}

export default function ThemeToggle({ className = '' }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => 'light')
  const isDark = theme === 'dark'

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const originX = rect.left + rect.width / 2
    const originY = rect.top + rect.height / 2
    playTransition(originX, originY, isDark ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-9 h-9 rounded-full border border-(--border) flex items-center justify-center text-(--foreground) hover:border-(--accent) hover:text-(--accent) transition-colors duration-300 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <g className="theme-toggle-sun">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </g>
        <path
          className="theme-toggle-moon"
          d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
        />
      </svg>
    </button>
  )
}
