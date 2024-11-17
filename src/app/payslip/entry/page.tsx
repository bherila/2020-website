import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import PayslipDetailClient from '@/app/payslip/entry/PayslipDetailClient'

export default function Page() {
  return (
    <Container>
      <MainTitle>Add payslip</MainTitle>
      <PayslipDetailClient />
    </Container>
  )
}
