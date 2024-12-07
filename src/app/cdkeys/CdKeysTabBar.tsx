'use client'

import React from 'react'
import { Nav } from 'react-bootstrap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CdKeysTabBar() {
  const pathname = usePathname()

  const tabs = [
    {
      href: '/cdkeys',
      label: 'My Keys',
      active: pathname.replace(/\/+$/, '') === '/cdkeys',
    },
    {
      href: '/cdkeys/import-xml',
      label: 'Import XML',
      active: pathname.replace(/\/+$/, '') === '/cdkeys/import-xml',
    },
    {
      href: '/cdkeys/add-key',
      label: 'Add Key',
      active: pathname.replace(/\/+$/, '') === '/cdkeys/add-key',
    },
  ]

  return (
    <Nav variant="tabs" className="mt-4">
      {tabs.map((tab) => (
        <Nav.Item key={tab.href}>
          <Link href={tab.href} passHref legacyBehavior>
            <Nav.Link active={tab.active}>{tab.label}</Nav.Link>
          </Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}
