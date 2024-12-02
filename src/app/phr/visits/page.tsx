import Container from '@/components/container'
import { getSession } from '@/server_lib/session'
import MainTitle from '@/components/main-title'
import Sidebar from '../components/Sidebar'

export default async function VisitsPage() {
  const session = await getSession()
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
        <MainTitle>Visits</MainTitle>
      </Container>
    </div>
  )
}
