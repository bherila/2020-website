import React, { useState } from 'react'
import { Col, Container, Row, Table } from 'reactstrap'

import Layout from '../../components/layout'

export default function render() {
  const [content, setContent] = useState('')
  const result = ''
  return (
    <Layout bootstrap hideNav>
      <Container fluid>
        <Row>
          <Col xs={6}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
              rows={20}
              wrap="nowrap"
            />
          </Col>
          <Col xs={6}>
            <pre>{result}</pre>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
