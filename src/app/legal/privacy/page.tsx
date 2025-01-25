import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import { H2Section } from '@/lib/h2-section'
import { BulletList } from '@/lib/bullet-list'
import { ContactEmail } from '@/lib/contact-email'

export default function PrivacyPage() {
  return (
    <Container>
      <MainTitle>Privacy Policy</MainTitle>
      <H2Section title="Introduction">
        <p className="text-lg">
          This Privacy Policy describes how <span id="website-name">Ben Herila</span> ("we", "us", or "our") collects, uses,
          and discloses your personal information when you use our website (the "Service").
        </p>
      </H2Section>

      <H2Section title="Information We Collect">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <p>We collect personal information that you voluntarily provide when:</p>
            <BulletList>
              <li>Creating an account</li>
              <li>Contacting us through forms or email</li>
              <li>Using interactive features of the Service</li>
            </BulletList>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Automated Collection</h3>
            <p>We automatically collect certain information through:</p>
            <BulletList>
              <li>Server logs (IP address, browser type, access times)</li>
              <li>Cookies and similar technologies</li>
              <li>Google Analytics (with anonymized IP addresses)</li>
            </BulletList>
          </div>
        </div>
      </H2Section>

      <H2Section title="How We Use Information">
        <BulletList>
          <li>Provide and maintain our Service</li>
          <li>Respond to inquiries and support requests</li>
          <li>Analyze usage patterns for improvements</li>
          <li>Prevent fraudulent activity</li>
        </BulletList>
      </H2Section>

      <H2Section title="Data Sharing">
        <p>We may share information with:</p>
        <BulletList>
          <li>Service providers under confidentiality agreements</li>
          <li>Legal authorities when required by law</li>
          <li>Successor entities in business transfers</li>
        </BulletList>
      </H2Section>

      <H2Section title="Security Measures">
        <p>We implement:</p>
        <BulletList>
          <li>SSL encryption for data transmission</li>
          <li>Regular security audits</li>
          <li>Access controls and authentication protocols</li>
        </BulletList>
      </H2Section>
      <H2Section title="Your California Privacy Rights">
        <p>Under CCPA, California residents have the right to:</p>
        <BulletList>
          <li>Request disclosure of collected data categories</li>
          <li>Request deletion of personal information</li>
          <li>Opt-out of data sales (we do not sell personal data)</li>
        </BulletList>
        <p className="mt-4">
          To exercise these rights, contact us at <ContactEmail />
        </p>
      </H2Section>

      <H2Section title="Policy Updates">
        <p>We will notify you of material changes through:</p>
        <BulletList>
          <li>Email notifications to registered users</li>
          <li>Prominent website notices</li>
          <li>Updated effective date (currently May 5, 2024)</li>
        </BulletList>
      </H2Section>

      <H2Section title="Contact Information">
        <p>
          For privacy-related inquiries:
          <br />
          Email: <ContactEmail />
          <br />
          Phone:{' '}
          <a href="tel:+19088831378" className="text-primary underline">
            (908) 883-1378
          </a>
        </p>
      </H2Section>
    </Container>
  )
}
