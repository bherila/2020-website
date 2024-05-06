import Container from 'react-bootstrap/Container'
import MainTitle from '@/components/main-title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function PrivacyPage() {
  return (
    <Container>
      <MainTitle>Privacy Policy</MainTitle>
      <Row>
        <Col xs={12}>
          <h2>Introduction</h2>

          <p>
            This privacy policy explains how{' '}
            <span id="website-name">Ben Herila Website</span> (the "Website")
            collects, uses, and discloses information when you use our Website.
            We respect your privacy and are committed to protecting your
            personal information.
          </p>

          <h2>Information We Collect</h2>

          <p>
            We collect two types of information from users of our Website: (1)
            personal information that users provide to us, and (2) non-personal
            information collected through Google Analytics.
          </p>

          <h3>Personal Information</h3>

          <p>We collect personal information from you when you:</p>

          <ul>
            <li>Contact us through our website form or email</li>
            <li>Create an account or register for a service</li>
          </ul>

          <p>
            This personal information may include your name, email address,
            phone number, and any other information you provide to us.
          </p>

          <h3>Non-Personal Information</h3>

          <p>
            We use Google Analytics to collect non-personal information about
            your use of our Website, including:
          </p>

          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Referring URL</li>
            <li>Pages visited</li>
            <li>Time spent on the Website</li>
          </ul>

          <p>
            Google Analytics uses cookies to collect this information. You can
            learn more about Google Analytics' data practices by visiting their
            website.
          </p>

          <h2>How We Use Your Information</h2>

          <p>We use your personal information to:</p>

          <ul>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Provide the services you have requested</li>
            <li>Communicate with you about our Website and services</li>
          </ul>

          <p>We use non-personal information to:</p>

          <ul>
            <li>Analyze and improve our Website and services</li>
            <li>Understand how users interact with our Website</li>
            <li>Improve our marketing efforts</li>
          </ul>

          <h2>Disclosure of Information</h2>

          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may disclose your information in the following
            circumstances:
          </p>

          <ul>
            <li>
              To comply with legal requirements or respond to legal process
            </li>
            <li>
              To protect the rights, safety, and property of our company, our
              employees, customers, or the public
            </li>
            <li>In the event of a merger, acquisition, or bankruptcy</li>
          </ul>

          <h2>Security</h2>

          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, use, and disclosure, including encryption
            and secure socket layer (SSL) technology.
          </p>

          <h2>IMPORTANT NOTICE FOR CALIFORNIA RESIDENTS</h2>
          <p>
            This company does not meet the criteria that would require CCPA
            compliance. It does not:
          </p>
          <ul>
            <li>Have annual gross revenue of over $25 million</li>
            <li>
              Buy, receive, sell or share the personal information of 50,000 or
              more consumers (a “consumer” is defined as a California resident),
              households or devices for commercial purposes each year
            </li>
            <li>
              Derive 50% or more of annual revenue from selling consumer
              personal information
            </li>
          </ul>

          <h2>IMPORTANT NOTICE FOR EU RESIDENTS</h2>
          <p>
            This website is not intended for use by individuals residing in the
            European Union (EU). We might not comply with the General Data
            Protection Regulation (GDPR) and other EU data protection laws. If
            you are an EU resident, please do not access or use this website, as
            we cannot ensure the protection of your personal data in accordance
            with EU standards. By using this website, you acknowledge that you
            are not an EU resident and consent to our processing of your
            personal data in accordance with our privacy policy.
          </p>

          <h2>Changes to This Privacy Policy</h2>

          <p>
            We may update this privacy policy from time to time. We will notify
            you of any significant changes by posting a notice on our Website or
            sending you an email.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have any questions about this privacy policy or our use of
            your information, please contact us at{' '}
            <span id="contact-info">benjamin_herila@alumni.brown.edu</span>.
          </p>

          <h2>Effective Date</h2>

          <p>
            This privacy policy was last updated on{' '}
            <span id="effective-date">May 5, 2024</span>.
          </p>
        </Col>
      </Row>
    </Container>
  )
}
