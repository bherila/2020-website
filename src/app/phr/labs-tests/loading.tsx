import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import Sidebar from '../components/Sidebar'
import Spinner from 'react-bootstrap/Spinner'

export default function Loading() {
  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid={true}>
        <MainTitle>Labs (Tiles)</MainTitle>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    </div>
  )
}
