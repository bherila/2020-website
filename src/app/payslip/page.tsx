import 'server-only'
import { Atkinson_Hyperlegible } from 'next/font/google'
import PayslipClient from './PayslipClient'
import requireSession from '@/server_lib/requireSession'
import Container from '@/components/container'
import { Col, Row } from 'react-bootstrap'

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
      <Container>
        <div className="container my-2">
          <Row>
            <Col xs={12}>
              Tax period: <b>2024-01-01 through 2024-12-31</b>
            </Col>
          </Row>
        </div>
      </Container>
      <PayslipClient year={new Date().getFullYear().toString()} />
    </main>
  )
}
