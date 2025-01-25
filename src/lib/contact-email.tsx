import Link from 'next/link'
import { cn } from '@/lib/utils'

export function ContactEmail({ className }: { className?: string }) {
  return (
    <Link
      href="mailto:benjamin_herila@alumni.brown.edu"
      className={cn('text-primary underline', className)}
      aria-label="Contact email"
    >
      benjamin_herila@alumni.brown.edu
    </Link>
  )
}
