// Shared read-side of the theme store. <html data-theme> is the single
// source of truth (see ThemeToggle.jsx for the write side / transition),
// so any component can subscribe without a Context provider.
export function getThemeSnapshot() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function subscribeTheme(callback) {
  // Custom event fired by ThemeToggle's applyTheme(); storage event syncs
  // other tabs.
  window.addEventListener('themechange', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('themechange', callback)
    window.removeEventListener('storage', callback)
  }
}
