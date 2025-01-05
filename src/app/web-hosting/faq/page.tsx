import MainTitle from '@/components/main-title'
import Container from '@/components/container'

export default function FaqPage() {
  return (
    <Container>
      <MainTitle>FAQ</MainTitle>
      <h2>What kind of system will my website use?</h2>
      <p>We have a cloud platform that runs on a mixture of AWS, Vercel, and Zume.IO.</p>
      <h2>Why is the web hosting more expensive than some other sites?</h2>
      <p>Your website get a lot more resources dedicated to it, including: </p>
      <ul>
        <li>2gb of RAM per website</li>
        <li>1tb monthly data transfer limit</li>
        <li>Free CDN, security, and DDOS protection via Cloudflare</li>
      </ul>
      <h2>What about payment processing, PCI compliance?</h2>
      <p>
        I recommend using a payment processor that is PCI compliant. We use Square for billing, which is PCI compliant and
        securely encrypts and stores all payment information.
      </p>
    </Container>
  )
}
