import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import PayslipDetailClient from '@/app/payslip/entry/PayslipDetailClient'
import { fetchPayslipByDetails } from './actions'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    period_start?: string
    period_end?: string
    pay_date?: string
  }>
}) {
  let initialPayslip = undefined
  const params = await searchParams

  // If all three parameters are provided, try to fetch the payslip
  if (params.period_start && params.period_end && params.pay_date) {
    try {
      initialPayslip = await fetchPayslipByDetails({
        period_start: params.period_start,
        period_end: params.period_end,
        pay_date: params.pay_date,
      })
    } catch (error) {}
  }

  return (
    <Container>
      <MainTitle>{initialPayslip ? 'Edit Payslip' : 'Add Payslip'}</MainTitle>
      <PayslipDetailClient initialPayslip={initialPayslip} />
    </Container>
  )
}
