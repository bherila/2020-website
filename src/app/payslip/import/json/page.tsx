import 'server-only'
import MainTitle from '@/components/main-title'
import requireSession from '@/server_lib/requireSession'
import Container from '@/components/container'
import JsonImportClient from './JsonImportClient'

export default async function PayslipJsonImportPage() {
  await requireSession()

  return (
    <Container>
      <div className="mt-8">
        <MainTitle>Import Payslip JSON</MainTitle>
        <JsonImportClient />
      </div>
    </Container>
  )
}
