import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Sidebar from '../components/Sidebar'
import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid={true}>
        <MainTitle>Labs (Raw)</MainTitle>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <Spinner />
        </div>
      </Container>
    </div>
  )
}
