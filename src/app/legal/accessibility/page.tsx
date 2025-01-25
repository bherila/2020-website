import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import { H2Section } from '@/lib/h2-section'
import { BulletList } from '@/lib/bullet-list'
import { ContactEmail } from '@/lib/contact-email'

export default function AccessibilityPage() {
  return (
    <Container>
      <MainTitle>Accessibility Statement</MainTitle>
      <p className="text-lg mb-8">
        Ben Herila is committed to ensuring digital accessibility for people with disabilities. We are continually improving
        the user experience for everyone and applying relevant accessibility standards.
      </p>

      <H2Section title="Conformance Status">
        <p>
          We aim to conform with WCAG 2.1 Level AA guidelines. Our website is regularly tested using automated tools and
          manual verification to monitor and improve accessibility.
        </p>
      </H2Section>

      <H2Section title="Feedback">
        <p>If you experience any accessibility barriers or have suggestions for improvement:</p>
        <BulletList>
          <li>
            Email: <ContactEmail />
          </li>
          <li>
            Phone:{' '}
            <a href="tel:+19088831378" className="text-primary underline">
              (908) 883-1378
            </a>
          </li>
          <li>Mailing Address: [Your Physical Address Here]</li>
        </BulletList>
      </H2Section>

      <H2Section title="Technical Specifications">
        <p>This website relies on the following technologies:</p>
        <BulletList>
          <li>HTML</li>
          <li>WAI-ARIA</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </BulletList>
      </H2Section>

      <H2Section title="Conformance">
        <p>
          To provide a great experience to everyone we are using The Web Content Accessibility Guidelines (WCAG). The
          guidelines have three levels of accessibility (A, Level AA, and Level AAA). We have chosen level AA as a target
          for our website and we are fully committed to monitoring our site to maintain this level of compliance.
        </p>
      </H2Section>

      <H2Section title="Third-Party Vendors">
        <p>
          We encourage our third party vendors to provide content that is accessible and user friendly, even though we
          cannot control their content that appears on our website.
        </p>
      </H2Section>

      <H2Section title="Assistance">
        <p>
          If you need any assistance please call us at{' '}
          <a href="tel:+19088831378" className="text-primary underline">
            (908) 883-1378
          </a>{' '}
          during our regular business hours and we'd be happy to help you with anything on our site. We try to respond to
          voicemails within 2 business days.
        </p>
      </H2Section>
    </Container>
  )
}
