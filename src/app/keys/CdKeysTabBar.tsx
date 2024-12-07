'use client'

import React from 'react'
import { Nav } from 'react-bootstrap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CdKeysTabBar() {
  const pathname = usePathname()

  const tabs = [
    {
      href: '/keys/',
      label: 'My Keys',
      active: pathname.replace(/\/+$/, '') === '/keys',
    },
    {
      href: '/keys/import-xml/',
      label: 'Import XML',
      active: pathname.replace(/\/+$/, '') === '/keys/import-xml',
    },
    {
      href: '/keys/add-key/',
      label: 'Add Key',
      active: pathname.replace(/\/+$/, '') === '/keys/add-key',
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
