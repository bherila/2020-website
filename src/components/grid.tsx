import { ReactNode } from 'react'

export default function Grid(props: {
  children: ReactNode
  container?: boolean
  item?: boolean
  xs?: any
  sm?: any
  md?: any
  lg?: any
  px?: any
  py?: any
}) {
  const { children, ...aProps } = props
  return <div>{children}</div>
}
