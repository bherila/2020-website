import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export function BulletList({ children, className }: { children: ReactNode; className?: string }) {
  return <ul className={cn('list-disc pl-6 mt-2 space-y-2', className)}>{children}</ul>
}
