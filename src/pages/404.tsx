import React from 'react'
import { Col, Container, Row } from 'reactstrap'

import Layout from '../components/layout'

export default function NotFound() {
  return (
    <Layout bootstrap>
      <Container>
        <Row>
          <Col xs={12}>
            <h1>Not found</h1>
            <p>The page you requested was not found.</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
