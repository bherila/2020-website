'use client'
import Alert from 'react-bootstrap/Alert'
import React from 'react'

export default function SPGP_CTA_Content() {
  return (
    <Alert variant="info">
      Oh hey you have access to discounted ski passes!
      <Alert.Link href="/spgp/" className="px-1">
        Go there
      </Alert.Link>
    </Alert>
  )
}
