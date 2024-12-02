import 'server-only'
import CdKeyClient from '@/app/cdkeys/CdKeyClient'
import MainTitle from '@/components/main-title'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import db from '@/server_lib/db'
import { z } from 'zod'
import productKeySchema from '@/lib/productKeySchema'
import CdKeysTabBar from '@/app/cdkeys/CdKeysTabBar'

export default async function CdKeyPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }

  const rows = await db.query('SELECT * FROM product_keys')
  const parsedRows = z.array(productKeySchema).parse(rows)

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>CDKeys</MainTitle>
          <CdKeysTabBar />
          <CdKeyClient initialRows={parsedRows} />
        </Col>
      </Row>
    </Container>
  )
}
