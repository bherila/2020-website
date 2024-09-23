import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { getSession } from '@/lib/session'
import React from 'react'

export default async function SPGP_CTA() {
  const session = await getSession();
  return !!session?.ax_spgp ? (
    <Row className="pt-2 animate__animated animate__fadeInUp">
      <Col xs={12}>
        <Alert variant="info">
          Oh hey you have access to discounted ski passes!
          <Alert.Link href="/spgp/" className="px-1">
            Go there
          </Alert.Link>
        </Alert>
      </Col>
    </Row>
  ) : (
    <React.Fragment />
  )
}
