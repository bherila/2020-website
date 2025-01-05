import Container from '@/components/container'
import Form from 'next/form'
import { RequestPasswordResetAction } from '../../RequestPasswordResetAction'
import ResetPwClient from './ResetPwClient'
import MainTitle from '@/components/main-title'
export default function ResetPasswordPage() {
  return (
    <Container>
      <MainTitle>Reset Password</MainTitle>
      <Form action={RequestPasswordResetAction}>
        <ResetPwClient />
      </Form>
    </Container>
  )
}
