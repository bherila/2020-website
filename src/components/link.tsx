import React from 'react'

export default function Link(props: { rel?: string; href: string; children: React.ReactNode }) {
  const { children, ...aProps } = props
  return <a {...aProps}>{children}</a>
}
