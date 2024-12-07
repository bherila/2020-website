import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import MainTitle from '@/components/main-title'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CdKeysTabBar from '@/app/keys/CdKeysTabBar'
import AddKeyClientComponent from './AddKeyClientComponent'
import addProductKey from './addProductKey'

export default async function AddKeyPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>Add License Key</MainTitle>
          <CdKeysTabBar />
          <AddKeyClientComponent addProductKey={addProductKey} />
        </Col>
      </Row>
    </Container>
  )
}
