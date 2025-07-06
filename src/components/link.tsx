import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

interface CustomLinkProps extends React.ComponentProps<typeof Link> {
  noUnderline?: boolean
}

export default function CustomLink({ className, children, target, href, noUnderline, ...rest }: CustomLinkProps) {
  const isExternal = typeof href === 'string' && href.indexOf('https') === 0

  const underlineClass = noUnderline ? '' : 'underline underline-offset-4'

  return (
    <Link
      className={cn(underlineClass, 'hover:text-blue-400 transition-colors', className)}
      target={target}
      href={href}
      {...(isExternal ? { rel: 'noopener' } : {})}
      {...rest}
    >
      {children}
      {(target === '_blank' || isExternal) && (
        <ExternalLink
          style={{
            display: 'inline',
            marginLeft: '0.25em',
            verticalAlign: 'middle',
            opacity: 0.9,
            width: '0.8em',
            height: '0.8em',
          }}
          aria-label="Opens in a new window"
        />
      )}
    </Link>
  )
}
