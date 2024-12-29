import { Metadata } from 'next'
import { ReactNode } from 'react'
import Typography from '@/components/typography'
import Link from '@/components/link'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

export const metadata: Metadata = {
  title: 'Ben Herila',
}

export default async function HomePage() {
  const Im = <>I&rsquo;m</>
  const Line = ({ children }: { children: ReactNode }) => (
    <Typography variant="body1" py={0.5}>
      {children}
    </Typography>
  )

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={8}>
          <MainTitle>Hi, {Im} Ben</MainTitle>

          <Line>
            {Im} a Software Engineer at Meta. {Im} currently working on{' '}
            <Link rel="noopener" href="https://horizon.meta.com">
              Horizon Worlds
            </Link>
            .
          </Line>

          <Line>
            Before Meta, I worked at Airbnb on the i18n team. We expanded Airbnb.com to 32 new countries, added support for
            right-to-left, 4-byte unicode, and more. You can read about it on the{' '}
            <Link
              rel="noopener"
              href="https://medium.com/airbnb-engineering/building-airbnbs-internationalization-platform-45cf0104b63c"
            >
              Airbnb engineering blog
            </Link>
            .
          </Line>

          <Line>
            Before Airbnb, I was the co-founder and CTO of an e-commerce wine company called{' '}
            <a href="https://www.undergroundcellar.com">Underground Cellar</a>. We participated in the Y Combinator Winter
            2015 batch.
          </Line>

          <Line>
            I began my professional career at Microsoft, briefly on the Office Graphics platform, and then for nearly four
            years on{' '}
            <Link rel="noopener" href="https://servercore.net/2013/07/meet-the-new-server-core-program-manager/">
              making Windows Server smaller
            </Link>
            .
          </Line>

          <Line>
            Before then, I worked on numerous personal projects and business ventures, and built the online presence for
            companies including{' '}
            <Link href="/projects/roessner/" rel="noopener">
              Roessner &amp; Co.
            </Link>
            ,{' '}
            <Link href="/projects/walsh/" rel="noopener">
              The Walsh Company
            </Link>
            ,{' '}
            <Link href="/projects/marisol/" rel="noopener">
              Marisol
            </Link>
            , and <Link href="/projects/">more</Link>.
          </Line>
        </Col>
      </Row>
    </Container>
  )
}
