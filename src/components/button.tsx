import * as React from 'react'

export default function Button(props: {
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  variant?: string
  size?: string
}): React.ReactElement {
  const { children, size, ...xProps } = props
  return <button {...xProps}>{props.children}</button>
}
