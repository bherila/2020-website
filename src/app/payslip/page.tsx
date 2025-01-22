import 'server-only'
import PayslipClient from './PayslipClient'
import requireSession from '@/server_lib/requireSession'
import Container from '@/components/container'

export default async function PayslipPage() {
  await requireSession('/payslip')
  return (
    <main>
      <Container>
        <div className="container my-2">
          Tax period: <b>2024-01-01 through 2024-12-31</b>
        </div>
      </Container>
      <PayslipClient year={new Date().getFullYear().toString()} />
    </main>
  )
}
