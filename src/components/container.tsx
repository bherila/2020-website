import * as React from 'react'
import RBSContainer from 'react-bootstrap/Container'

export default function Container(props: {
  children?: React.ReactNode
  fluid?: boolean
}): React.ReactElement {
  const { children, ...remainingProps } = props
  return (
    <main>
      <RBSContainer {...remainingProps}>{children}</RBSContainer>
    </main>
  )
}
