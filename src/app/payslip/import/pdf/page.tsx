import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import FileUploadClient from '@/app/payslip/FileUploadClient'
import Container from '@/components/container'

export default async function ImportPdfPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }

  return (
    <Container>
      <h3>Import PDF</h3>
      <FileUploadClient acceptTypes={['application/pdf']} />
    </Container>
  )
}
