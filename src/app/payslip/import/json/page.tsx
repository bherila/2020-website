import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import JsonImportClient from './JsonImportClient'
import Container from '@/components/container'

export default async function ImportJsonPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }

  return (
    <Container>
      <h3>Import JSON</h3>
      <JsonImportClient />
    </Container>
  )
}
