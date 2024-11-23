import SignupForm from '@/app/auth/sign-up/SignupForm'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MainTitle from '@/components/main-title'

export default function SignupPage() {
  return (
    <Container>
      <Row>
        <Col sm={6}>
          <MainTitle>Sign up</MainTitle>
          <SignupForm />
        </Col>
      </Row>
    </Container>
  )
}
