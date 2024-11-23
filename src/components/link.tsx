import { ReactNode } from 'react'

export default function Link(props: { rel?: string; href: string; children: ReactNode }) {
  const { children, ...aProps } = props
  return <a {...aProps}>{children}</a>
}
