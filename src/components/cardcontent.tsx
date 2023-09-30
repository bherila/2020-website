import * as React from 'react'

export default function CardContent(props: {
  children?: React.ReactNode
}): React.ReactElement {
  return <div>{props.children}</div>
}
