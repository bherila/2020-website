import * as React from 'react'
import cn from 'classnames'

export default function Container(props: {
  className?: string
  children?: React.ReactNode
  fluid?: boolean
}): React.ReactElement {
  return (
    <main
      className={cn(
        'mt-16',
        {
          'container mx-auto px-4': !props.fluid,
          'w-full': props.fluid,
        },
        props.className,
      )}
    >
      {props.children}
    </main>
  )
}
