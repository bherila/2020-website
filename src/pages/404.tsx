import Layout from '../components/layout'
import { Container, Row, Col } from 'reactstrap'

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
