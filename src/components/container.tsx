import * as React from 'react'

export default function Container(props: { children?: React.ReactNode; fluid?: boolean }): React.ReactElement {
  return <main className={`${props.fluid ? 'w-full' : 'container mx-auto px-4'} mt-16`}>{props.children}</main>
}
