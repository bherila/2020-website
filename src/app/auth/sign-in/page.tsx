import SignInForm from '@/app/auth/sign-in/SignInForm'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  return (
    <Container>
      <MainTitle>Sign in</MainTitle>
      <SignInForm nextUrl={(await searchParams).next} />
    </Container>
  )
}
