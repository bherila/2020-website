import Container from '@/components/container'
import CapitalLossCarryoverClient from './CapitalLossCarryoverClient'
import { Metadata } from 'next'
import Link from '@/components/link'

const TITLE = 'Interactive IRS Worksheet - Schedule D - Capital Loss Carryover'

export const metadata: Metadata = {
  title: TITLE,
}

export default function Page() {
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">{TITLE}</h1>
      <p className="mb-6">
        This interactive worksheet helps you calculate your capital loss carryover from Schedule D according to the{' '}
        <Link
          href="https://www.irs.gov/instructions/i1040sd"
          target="_blank"
          rel="noopener nofollow"
          className="text-blue-600 underline"
        >
          IRS Schedule D Instructions
        </Link>
        . Enter your amounts below to see your carryover results.
      </p>
      <p className="mb-6">
        WARNING: This form is not a substitute for professional tax advice and there is no warranty express or implied.
        Always consult with a tax professional for your specific situation.
      </p>
      <div className="max-w-3xl mx-auto">
        <CapitalLossCarryoverClient />
      </div>
    </Container>
  )
}
