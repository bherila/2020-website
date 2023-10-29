import Client from '@/app/cdkeys/Client'
import MainTitle from '@/components/main-title'
import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

export default function Page() {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>CDKeys</MainTitle>
          <Client />
        </Col>
      </Row>
    </Container>
  )
}
