'use client'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

const navItems = [
  { name: 'View', uri: '/phr/labs-raw' },
  { name: 'Import', uri: '/phr/labs-raw/import' },
]

export default function LabsRawNavigation() {
  const pathname = usePathname()
  const normalizedPathname = pathname.replace(/\/+$/, '')

  return (
    <Tabs defaultValue={normalizedPathname} className="mb-3">
      <TabsList>
        {navItems.map((item) => (
          <TabsTrigger key={item.uri} value={item.uri} asChild>
            <Link href={item.uri}>{item.name}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
