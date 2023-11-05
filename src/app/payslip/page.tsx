import 'server-only'
import PayslipClient from '@/app/payslip/PayslipClient'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'

export default async function Payslip() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
    return null
  }
  return <PayslipClient />
}
