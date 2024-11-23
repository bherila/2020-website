import Container from '@/components/container'
import MainTitle from '@/components/main-title'

export default async function WebHosting() {
  return (
    <Container>
      <MainTitle>Web hosting?</MainTitle>
      <p>
        Web hosting isn't something I really do as a business anymore, but I occasionally have availability on one of the
        servers that I manage for people who have specific hosting needs. The most common use case is{' '}
        <b>extremely fast WordPress hosting</b>. I will install WordPress for you, and import your site. I can provide
        FTP/SFTP/SSH access if you need, but not root access. I may be able/willing to install specific Ubuntu packages if
        you need. Limited tech support is available, but it's expected your usage will mostly be self-service i.e. wp-admin
        panel.
      </p>
      <p>Cost: The cost is $25 per month, billed annually in advance at $300.</p>
      <p>
        Limitation: Outgoing email is blocked, you need to provide your own Amazon SES or SMTP configuration if your site
        needs to send email.
      </p>
      <p>
        If you're interested in this service, please{' '}
        <a href="mailto:ben@benherila.com?subject=Web Hosting Inquiry">contact me</a>.
      </p>
    </Container>
  )
}
