'use client'

import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf((theme as 'light' | 'dark' | 'system') || 'system')
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const icon = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🌒'
  const label = `Theme: ${theme}`

  return (
    <button
      suppressHydrationWarning
      onClick={cycleTheme}
      aria-label={label}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
    >
      {icon}
    </button>
  )
}
