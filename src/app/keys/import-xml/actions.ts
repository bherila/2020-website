import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'
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

  const session = await requireSession()

  try {
    // Use Prisma's createMany for batch insert
    await prisma.productKey.createMany({
      data: productKeys.map((key) => ({
        uid: session.uid,
        productId: key.productId,
        productKey: key.productKey,
        productName: key.productName,
        computerName: key.computerName || null,
        comment: key.comment || null,
        usedOn: key.usedOn || null,
        claimedDate: key.claimedDate || null,
        keyType: key.keyType || null,
        keyRetrievalNote: key.keyRetrievalNote || null,
      })),
    })

    redirect('/keys')
  } catch (error) {
    console.error('Error uploading product keys:', error)
    throw error
  }
}
