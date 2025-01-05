import SignupForm from '@/app/auth/sign-up/SignupForm'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'

export default function SignupPage() {
  return (
    <Container className="max-w-md">
      <MainTitle>Sign up</MainTitle>
      <SignupForm />
    </Container>
  )
}
