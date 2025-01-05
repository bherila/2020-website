'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

type Theme = 'light' | 'dark' | 'auto'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'auto',
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'auto')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    const updateTheme = () => {
      if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.classList.toggle('dark', prefersDark)
      } else {
        root.classList.toggle('dark', theme === 'dark')
      }
    }

    updateTheme()

    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', updateTheme)
      return () => mediaQuery.removeEventListener('change', updateTheme)
    }
  }, [theme])

  if (!mounted) {
    return null
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
