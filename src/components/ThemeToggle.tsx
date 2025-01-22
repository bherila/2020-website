'use client'

import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const icon = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🌒'
  const label = `Theme: ${theme}`

  return (
    <button
      onClick={cycleTheme}
      aria-label={label}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
    >
      {icon}
    </button>
  )
}
