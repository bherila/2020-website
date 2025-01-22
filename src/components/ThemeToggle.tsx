'use client'

import { useTheme } from './ThemeProvider'
import Nav from 'react-bootstrap/Nav'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
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
    <OverlayTrigger placement="bottom" overlay={<Tooltip>{label}</Tooltip>}>
      <Nav.Link onClick={cycleTheme} aria-label={label}>
        {icon}
      </Nav.Link>
    </OverlayTrigger>
  )
}
