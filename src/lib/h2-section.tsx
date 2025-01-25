import { cn, slugify } from '@/lib/utils'
import { ReactNode } from 'react'

export function H2Section({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  const id = slugify(title)
  return (
    <section aria-labelledby={id} className={cn('mt-8', className)}>
      <h2 id={id} className="text-2xl font-bold mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}
