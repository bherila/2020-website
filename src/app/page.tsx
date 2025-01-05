import { Metadata } from 'next'
import { ReactNode } from 'react'
import Link from 'next/link'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'

export const metadata: Metadata = {
  title: 'Ben Herila',
}

export default async function HomePage() {
  const Im = <>I&rsquo;m</>
  const Line = ({ children }: { children: ReactNode }) => (
    <p className="py-2 text-gray-700 dark:text-gray-300">{children}</p>
  )

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <MainTitle>Hi, {Im} Ben</MainTitle>

        <Line>
          {Im} a Software Engineer at Meta. {Im} currently working on{' '}
          <Link href="https://horizon.meta.com" className="text-primary hover:text-primary/80" rel="noopener">
            Horizon Worlds
          </Link>
          .
        </Line>

        <Line>
          Before Meta, I worked at Airbnb on the i18n team. We expanded Airbnb.com to 32 new countries, added support for
          right-to-left, 4-byte unicode, and more. You can read about it on the{' '}
          <Link
            href="https://medium.com/airbnb-engineering/building-airbnbs-internationalization-platform-45cf0104b63c"
            className="text-primary hover:text-primary/80"
            rel="noopener"
          >
            Airbnb engineering blog
          </Link>
          .
        </Line>

        <Line>
          Before Airbnb, I was the co-founder and CTO of an e-commerce wine company called{' '}
          <Link href="https://www.undergroundcellar.com" className="text-primary hover:text-primary/80">
            Underground Cellar
          </Link>
          . We participated in the Y Combinator Winter 2015 batch.
        </Line>

        <Line>
          I began my professional career at Microsoft, briefly on the Office Graphics platform, and then for nearly four
          years on{' '}
          <Link
            href="https://servercore.net/2013/07/meet-the-new-server-core-program-manager/"
            className="text-primary hover:text-primary/80"
            rel="noopener"
          >
            making Windows Server smaller
          </Link>
          .
        </Line>

        <Line>
          Before then, I worked on numerous personal projects and business ventures, and built the online presence for
          companies including{' '}
          <Link href="/projects/roessner/" className="text-primary hover:text-primary/80" rel="noopener">
            Roessner &amp; Co.
          </Link>
          ,{' '}
          <Link href="/projects/walsh/" className="text-primary hover:text-primary/80" rel="noopener">
            The Walsh Company
          </Link>
          ,{' '}
          <Link href="/projects/marisol/" className="text-primary hover:text-primary/80" rel="noopener">
            Marisol
          </Link>
          , and{' '}
          <Link href="/projects/" className="text-primary hover:text-primary/80">
            more
          </Link>
          .
        </Line>
      </div>
    </Container>
  )
}
