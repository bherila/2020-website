'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const tabs = [
  {
    name: 'List',
    href: '/payslip',
    active: (path: string) =>
      path.startsWith('/payslip') && !path.startsWith('/payslip/import') && !path.startsWith('/payslip/config'),
  },
  {
    name: 'Import PDF',
    href: '/payslip/import/pdf',
    active: (path: string) => path.startsWith('/payslip/import/pdf'),
  },
  {
    name: 'Import JSON',
    href: '/payslip/import/json',
    active: (path: string) => path.startsWith('/payslip/import/json'),
  },
  {
    name: 'Configuration',
    href: '/payslip/config',
    active: (path: string) => path.startsWith('/payslip/config'),
  },
]

export default function PayslipNavigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const yearParam = searchParams.get('year')

  const getTabHref = (href: string) => {
    return yearParam ? `${href}?year=${yearParam}` : href
  }

  return (
    <Tabs defaultValue={tabs.find((tab) => tab.active(pathname))?.href} className="mb-3 mt-4 w-full">
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <Link href={getTabHref(tab.href)} key={tab.href} passHref legacyBehavior>
            <TabsTrigger value={tab.href} data-state={tab.active(pathname) ? 'active' : 'inactive'}>
              {tab.name}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  )
}
