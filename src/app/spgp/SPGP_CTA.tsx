import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getSession } from '@/lib/session'
import { Fragment } from 'react'
import SPGP_CTA_Content from '@/app/spgp/SPGP_CTA_Content'

export default async function SPGP_CTA() {
  const session = await getSession()
  return !!session?.ax_spgp ? (
    <Row className="pt-2 animate__animated animate__fadeInUp">
      <Col xs={12}>
        <SPGP_CTA_Content />
      </Col>
    </Row>
  ) : (
    <Fragment />
  )
}
