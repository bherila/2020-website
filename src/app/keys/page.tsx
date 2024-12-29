import 'server-only'
import CdKeyClient from '@/app/keys/CdKeyClient'
import MainTitle from '@/components/main-title'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import db from '@/server_lib/db'
import { z } from 'zod'
import productKeySchema from '@/lib/productKeySchema'
import CdKeysTabBar from '@/app/keys/CdKeysTabBar'
import requireSession from '@/server_lib/requireSession'

export default async function CdKeyPage() {
  await requireSession('/keys')

  const rows = await db.query('SELECT * FROM product_keys')
  const parsedRows = z.array(productKeySchema).parse(rows)

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>License Manager</MainTitle>
          <CdKeysTabBar />
          <CdKeyClient initialRows={parsedRows} />
        </Col>
      </Row>
    </Container>
  )
}
