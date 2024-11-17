import { Metadata } from 'next'
import Typography from '@/components/typography'
import Link from '@/components/link'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import SPGP_CTA from '@/app/spgp/SPGP_CTA'
import Alert from 'react-bootstrap/Alert'

export const metadata: Metadata = {
  title: 'Ben Herila',
}

export default async function HomePage() {
  const Im = <>I&rsquo;m</>
  const Line = ({ children }: { children: React.ReactNode }) => (
    <Typography variant="body1" py={0.5}>
      {children}
    </Typography>
  )
  return (
    <Container>
      <SPGP_CTA />
      <Row className="animate__animated">
        <Col xs={12}>
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
            Before Airbnb, I was the co-founder and CTO of an e-commerce wine company. We participated in the Y Combinator
            Winter 2015 batch.
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

          <Alert variant="info">
            <h3>Are you here because your WordPress site is slow and you want me to make it fast?</h3>
            <p>I might be able to help with that.</p>
            <ul>
              <li>Most WordPress sites are eligible.</li>
              <li>Setup fee is $450, and includes migration of your existing site and the first 3 months of hosting.</li>
              <li>Hosting is $25 per month thereafter.</li>
            </ul>
            <p>
              In that case, feel free to <a href="mailto:ben@herila.net?subject=WordPress">Get in touch</a>.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}
