'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
    <Tabs defaultValue={tabs.find((tab) => tab.active)?.href} className="mt-4">
      <TabsList>
        {tabs.map((tab) => (
          <Link href={tab.href} key={tab.href} passHref legacyBehavior>
            <TabsTrigger value={tab.href} data-state={tab.active ? 'active' : 'inactive'}>
              {tab.label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  )
}
