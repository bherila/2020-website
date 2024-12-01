import 'server-only'
import Client from '@/app/cdkeys/Client'
import MainTitle from '@/components/main-title'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'

export default async function Page() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
    return null
  }
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>CDKeys</MainTitle>
          <Client />
        </Col>
      </Row>
    </Container>
  )
}
