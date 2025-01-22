import SignInForm from '@/app/auth/sign-in/SignInForm'
import { getSession } from '@/server_lib/session'
import SignInAction from '@/app/auth/SigninAction'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const session = await getSession()
  const nextUrl = (await searchParams).next
  return (
    <Container>
      <MainTitle>Sign in</MainTitle>
      <form action={SignInAction}>
        <SignInForm nextUrl={nextUrl} />
      </form>
    </Container>
  )
}
