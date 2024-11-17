import * as React from 'react'

export default function Card(props: { children?: React.ReactNode }): React.ReactElement {
  return <div>{props.children}</div>
}
