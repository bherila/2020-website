import 'server-only'
import { Atkinson_Hyperlegible } from 'next/font/google'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import PayslipClient from './PayslipClient'

const atkinson = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-atkinson',
})

export default async function PayslipPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }
  return (
    <main className={atkinson.variable}>
      <PayslipClient year={new Date().getFullYear().toString()} />
    </main>
  )
}
