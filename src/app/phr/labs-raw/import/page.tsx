import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Sidebar from '../../components/Sidebar'
import LabsRawNavigation from '../LabsRawNavigation'
import { getSession } from '@/server_lib/session'
import FolderUploader from './FolderUploader'

export default async function ImportPage() {
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
      <Container fluid={true}>
        <MainTitle>Labs (Raw)</MainTitle>
        <LabsRawNavigation />
        <FolderUploader />
      </Container>
    </div>
  )
}
