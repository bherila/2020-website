import db from '@/server_lib/db'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'

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

export default async function uploadProductKeys(productKeys: ProductKeyForImport[]) {
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
