import React from 'react'
import Container from '@/components/container'
import Typography from '@/components/typography'
import Link from '@/components/link'

export default function MarisolPage() {
  return (
    <Container>
      <Typography variant="h1">Marisol</Typography>
      <Typography variant="body1" py={1}>
        Marisol, Inc. was founded in 1962 by my grandfather H. Peter. Marisol was a pioneer in solvent recycling in the
        Northeastern USA and reclaimed virgin materials from hazardous waste. It had the only facility in North America to
        receive El Digest Award for no RCRA violations for 8 consecutive years.
      </Typography>
      <Typography variant="body1" py={1}>
        As a child I grew up around the Marisol office, which was run on paper and typewriters. As the company moved into
        the 21st century, we hired an IT pro named Derek who took me on as his summer intern across multiple years. I not
        only helped troubleshoot IT issues, but also took the lead on building custom software that made the company more
        productive. In 2007, we sold the company to{' '}
        <Link href="https://www.waterworld.com/drinking-water/potable-water-quality/article/16223310/veolia-environmental-services-acquires-marisol-inc">
          Veolia ES
        </Link>
        .
      </Typography>
      <Typography variant="body1" py={1}>
        That experience gave me what I eventually parlayed into my future career in software engineering.
      </Typography>
    </Container>
  )
}
