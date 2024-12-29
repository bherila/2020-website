import 'server-only'
import { Atkinson_Hyperlegible } from 'next/font/google'
import PayslipClient from './PayslipClient'
import requireSession from '@/server_lib/requireSession'

const atkinson = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-atkinson',
})

export default async function PayslipPage() {
  await requireSession('/payslip')
  return (
    <main className={atkinson.variable}>
      <PayslipClient year={new Date().getFullYear().toString()} />
    </main>
  )
}
