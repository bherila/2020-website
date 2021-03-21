import React from 'react'

interface ContainerProps {
  children: any
}

export default function V3container({ children }: ContainerProps) {
  return <div className="v3-container">{children}</div>
}
