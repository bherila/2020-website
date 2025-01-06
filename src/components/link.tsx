import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function CustomLink(props: { rel?: string; href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={props.href}
      rel={props.rel}
      className={cn('underline underline-offset-4 hover:text-blue-400 transition-colors', props.className)}
    >
      {props.children}
    </Link>
  )
}
