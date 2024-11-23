import Container from '@/components/container'
import Typography from '@/components/typography'

export default function Page() {
  return (
    <Container>
      <Typography variant="h1">The Walsh Company</Typography>
      <Typography variant="body1" py={1}>
        I built the website and some in-house line of business apps as a summer intern here.
      </Typography>
    </Container>
  )
}
