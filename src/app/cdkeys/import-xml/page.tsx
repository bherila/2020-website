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
import db from '@/server_lib/db'

export interface ProductKeyForImport {
  id?: number
  uid?: number
  productId: string
  productKey: string
  productName: string
  computerName?: string
  comment?: string
  usedOn?: string
  claimedDate?: string
  keyType?: string
  keyRetrievalNote?: string
}

export async function uploadProductKeys(productKeys: ProductKeyForImport[]) {
  'use server'

  const session = await getSession()
  if (!session?.uid) {
    throw new Error('Unauthorized')
  }

  try {
    // Prepare batch insert query
    const insertQuery = `
      INSERT INTO product_keys (
        uid, 
        product_id, 
        product_key, 
        product_name, 
        computer_name, 
        comment, 
        used_on, 
        claimed_date, 
        key_type, 
        key_retrieval_note
      ) VALUES ?
    `

    // Map product keys to match database schema, adding current user's ID
    const mappedKeys = productKeys.map((key) => [
      session.uid,
      key.productId,
      key.productKey,
      key.productName,
      key.computerName || null,
      key.comment || null,
      key.usedOn || null,
      key.claimedDate || null,
      key.keyType || null,
      key.keyRetrievalNote || null,
    ])

    // Execute batch insert
    await db.query(insertQuery, [mappedKeys])

    // Redirect to main cdkeys page
    redirect('/cdkeys')
  } catch (error) {
    console.error('Error uploading product keys:', error)
    throw error
  }
}

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
