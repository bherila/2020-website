import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import MainTitle from '@/components/main-title'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CdKeysTabBar from '@/app/cdkeys/CdKeysTabBar'
import ProductKeyUploader from './ProductKeyUploader'
import uploadProductKeys from './actions'

export default async function ImportXmlPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>Import XML</MainTitle>
          <CdKeysTabBar />
          <div className="pt-3">
            <ProductKeyUploader uploadAction={uploadProductKeys} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
