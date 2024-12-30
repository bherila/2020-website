import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Sidebar from '../components/Sidebar'
import requireSession from '@/server_lib/requireSession'

export default async function VaccinesPage() {
  const session = await requireSession()
  if (!session?.ax_phr) {
    return (
      <Container>
        <MainTitle>Access denied</MainTitle>
        <h2>You don&apos;t have access to this application.</h2>
      </Container>
    )
  }
  return (
    <div className="d-flex">
      <Sidebar />
      <Container>
        <MainTitle>Vaccines</MainTitle>
      </Container>
    </div>
  )
}
