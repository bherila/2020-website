import * as React from 'react'
import RBSContainer from 'react-bootstrap/Container'

export default function Container(props: {
  children?: React.ReactNode
}): React.ReactElement {
  return (
    <main>
      <RBSContainer>{props.children}</RBSContainer>
    </main>
  )
}
