import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MainTitle from '@/components/main-title'

export default function AccessibilityPage() {
  return (
    <Container>
      <MainTitle>Accessibility Statement for Ben Herila Website</MainTitle>
      <Row>
        <Col xs={12}>
          <p>
            We are committed to making our site accessible to people with disabilities. We are continuously gathering
            feedback and improving the user experience for everyone.
          </p>
          <h2>Conformance</h2>
          <p>
            To provide a great experience to everyone we are using The Web Content Accessibility Guidelines (WCAG). The
            guidelines have three levels of accessibility (A, Level AA, and Level AAA). We have chosen level AA as a target
            for our website and we are fully committed to monitoring our site to maintain this level of compliance.
          </p>
          <h2>Third-Party Vendors</h2>
          <p>
            We encourage our third party vendors to provide content that is accessible and user friendly, even though we
            cannot control their content that appears on our website.
          </p>
          <h2>Feedback</h2>
          <p>
            How are we doing? We welcome your feedback on how to improve accessibility and usability of this website. Please
            let us know using this email address: E-mail:{' '}
            <a href="mailto:benjamin_herila@alumni.brown.edu">benjamin_herila@alumni.brown.edu</a>
          </p>
          <p>We try to respond to email within 2 business days.</p>
          <h2>Assistance</h2>
          <p>
            If you need any assistance please call us at <a href="tel:+19088831378">9088831378</a> during our regular
            business hours and we'd be happy to help you with anything on our site. We try to respond to voicemails within 2
            business days.
          </p>
        </Col>
      </Row>
    </Container>
  )
}
