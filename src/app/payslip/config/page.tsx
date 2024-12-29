import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import Container from '@/components/container'

export default async function ConfigPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }

  return (
    <Container>
      <h3>Configuration</h3>
      <p>Configuration options will go here</p>
    </Container>
  )
}
