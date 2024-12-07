'use client'

import { useTheme } from './ThemeProvider'
import Nav from 'react-bootstrap/Nav'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { SunFill, MoonFill, Circle } from 'react-bootstrap-icons'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const icon = theme === 'light' ? <SunFill /> : theme === 'dark' ? <MoonFill /> : <Circle />
  const label = `Theme: ${theme}`

  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>{label}</Tooltip>}>
      <Nav.Link onClick={cycleTheme} aria-label={label}>
        {icon}
      </Nav.Link>
    </OverlayTrigger>
  )
}
