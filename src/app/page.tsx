import { Metadata } from 'next'
import { ReactNode } from 'react'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import CustomLink from '@/components/link'

export const metadata: Metadata = {
  title: 'Ben Herila',
}

export default async function HomePage() {
  const Im = <>I&rsquo;m</>
  const Line = ({ children }: { children: ReactNode }) => <p className="py-2">{children}</p>

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <MainTitle>Hi, {Im} Ben</MainTitle>

        <Line>
          {Im} a Software Engineer at Meta. {Im} currently working on{' '}
          <CustomLink href="https://horizon.meta.com" rel="noopener">
            Horizon Worlds
          </CustomLink>
          .
        </Line>

        <Line>
          Before Meta, I worked at Airbnb on the i18n team. We expanded Airbnb.com to 32 new countries, added support for
          right-to-left, 4-byte unicode, and more. You can read about it on the{' '}
          <CustomLink
            href="https://medium.com/airbnb-engineering/building-airbnbs-internationalization-platform-45cf0104b63c"
            rel="noopener"
          >
            Airbnb engineering blog
          </CustomLink>
          .
        </Line>

        <Line>
          Before Airbnb, I was the co-founder and CTO of an e-commerce wine company called{' '}
          <CustomLink href="https://www.undergroundcellar.com">Underground Cellar</CustomLink>. We participated in the Y
          Combinator Winter 2015 batch.
        </Line>

        <Line>
          I began my professional career at Microsoft, briefly on the Office Graphics platform, and then for nearly four
          years on{' '}
          <CustomLink
            href="https://web.archive.org/web/20240806233349/https://servercore.net/2013/07/meet-the-new-server-core-program-manager/"
            rel="noopener"
          >
            making Windows Server smaller
          </CustomLink>
          .
        </Line>

        <Line>
          Before then, I worked on numerous personal projects and business ventures, and built the online presence for
          companies including{' '}
          <CustomLink href="/projects/roessner/" rel="noopener">
            Roessner &amp; Co.
          </CustomLink>
          ,{' '}
          <CustomLink href="/projects/walsh/" rel="noopener">
            The Walsh Company
          </CustomLink>
          ,{' '}
          <CustomLink href="/projects/marisol/" rel="noopener">
            Marisol
          </CustomLink>
          , and <CustomLink href="/projects/">more</CustomLink>.
        </Line>
      </div>
    </Container>
  )
}
