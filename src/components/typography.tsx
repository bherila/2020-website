import * as React from 'react'

export type VariantOrComponentType = 'body1' | 'h1'

export interface TypographyProps {
  children: React.ReactNode
  color?: 'primary' | 'green' | 'red'
  variant?: VariantOrComponentType
  component?: VariantOrComponentType
  py?: string | number
}

export default function Typography(props: TypographyProps) {
  if (props.variant == 'body1' || props.variant === null || props.variant === undefined) {
    return <p>{props.children}</p>
  } else {
    return <div>{props.children}</div>
  }
}
