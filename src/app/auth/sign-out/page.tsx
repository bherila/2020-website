import { getSession } from '@/lib/session'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'

export default async function SignOutPage() {
  const session = await getSession()
  return (
    <Container>
      <MainTitle>Sign out</MainTitle>
      {!!session?.uid ? (
        <p>You have NOT been successfully signed out uid {session.uid}</p>
      ) : (
        <p>You have been signed out.</p>
      )}
    </Container>
  )
}
