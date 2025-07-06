'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePathname } from 'next/navigation'

interface ActionButtonProps {
  title: string
  subtitle: string
  destUrl: string
}

const actionButtons: ActionButtonProps[] = [
  {
    title: 'Work with me on a project',
    subtitle: "Learn about consulting opportunities with me. I'm not currently looking for a new full time role.",
    destUrl: '/projects',
  },
  {
    title: 'Get in touch',
    subtitle: 'Send me an email using my online contact form.',
    destUrl: '/contact',
  },
  {
    title: 'Cook with me',
    subtitle: 'Browse the selection of recipes that I have published here.',
    destUrl: '/recipes',
  },
]

export function CTAs() {
  const pathname = usePathname()

  const normalizePath = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path)
  const normalizedPathname = normalizePath(pathname)

  const filteredButtons = actionButtons.filter((button) => normalizePath(button.destUrl) !== normalizedPathname)

  if (filteredButtons.length === 0) {
    return null // Don't render the section if no buttons are left
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Want to...?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredButtons.map((button) => (
          <Link href={button.destUrl} key={button.title}>
            <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{button.title}</CardTitle>
                <CardDescription>{button.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>{/* Content can be added here if needed, but for now it's just a clickable card */}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
