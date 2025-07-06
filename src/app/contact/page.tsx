import { Metadata } from 'next'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import { CTAs } from '@/components/ctas'

export const metadata: Metadata = {
  title: 'Contact',
}

export default async function ContactPage() {
  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <MainTitle>Get in touch</MainTitle>
        <p className="py-2">You can reach me at ben@herila.net</p>
        <CTAs />
      </div>
    </Container>
  )
}
