import Container from '@/components/container'
import Form from 'next/form'
import { RequestPasswordResetAction } from '../../RequestPasswordResetAction'
import ResetPwClient from './ResetPwClient'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MainTitle from '@/components/main-title'
export default function ResetPasswordPage() {
  return (
    <Container>
      <Row>
        <Col sm={6}>
          <MainTitle>Reset Password</MainTitle>
          <Form action={RequestPasswordResetAction}>
            <ResetPwClient />
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
