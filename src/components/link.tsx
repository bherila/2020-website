import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function CustomLink(props: { rel?: string; href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={props.href}
      rel={props.rel}
      className={cn('font-medium text-primary underline underline-offset-4 hover:text-primary/80', props.className)}
    >
      {props.children}
    </Link>
  )
}
