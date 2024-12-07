'use client'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import AccountNavigation from '../AccountNavigation'

export default function Loading() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <AccountNavigation
            accountId={
              // get account id from url from /accounts/[account_id]/import-transactions using regex
              (window.location.href.match(/\/accounts\/(\d+)\//) || [])[1]
            }
            activeTab="import"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
