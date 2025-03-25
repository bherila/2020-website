import 'server-only'
import PayslipClient from './PayslipClient'
import requireSession from '@/server_lib/requireSession'
import { fetchPayslipYears, fetchPayslips } from './entry/actions'

export default async function PayslipPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  await requireSession('/payslip')
  const currentYear = ((await searchParams)['year'] ?? new Date().getFullYear()).toString()
  const initialYears = await fetchPayslipYears()
  const initialData = await fetchPayslips(currentYear)

  return (
    <main className="mx-4">
      <PayslipClient selectedYear={currentYear} initialData={initialData} initialYears={initialYears} />
    </main>
  )
}
