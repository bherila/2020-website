'use client'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { getSession } from '@/lib/session'

export default function SPGP_CTA(props: { session: null | { ax_spgp?: any } }) {
  const { session } = props
  return (
    session &&
    session.ax_spgp && (
      <Row className="pt-2">
        <Col xs={12}>
          <Alert variant="info">
            Oh hey you have access to discounted ski passes!
            <Alert.Link href="/spgp/" className="px-1">
              Go there
            </Alert.Link>
          </Alert>
        </Col>
      </Row>
    )
  )
}
