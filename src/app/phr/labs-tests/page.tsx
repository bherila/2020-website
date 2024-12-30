import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Sidebar from '../components/Sidebar'
import LabsCards from './client'
import requireSession from '@/server_lib/requireSession'
import { getLabResults } from '../labs.service'
import SerializeLabResult from '../SerializeLabResult.server'

export default async function LabsFriendlyPage() {
  const session = await requireSession('/phr/labs-tests')
  const results = (await getLabResults()).map(SerializeLabResult)
  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid={true}>
        <MainTitle>Labs (Tiles)</MainTitle>
        <LabsCards labResults={results} />
      </Container>
    </div>
  )
}
