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
import { sql } from '@/server_lib/db'

export default async function AddKeyPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }

  const productNames = ((await sql`select distinct product_name from product_keys`) as any[])
    .map((row) => row.product_name)
    .filter((r) => typeof r === 'string')

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>Add License Key</MainTitle>
          <CdKeysTabBar />
          <AddKeyClientComponent addProductKey={addProductKey} productNames={productNames} />
        </Col>
      </Row>
    </Container>
  )
}
