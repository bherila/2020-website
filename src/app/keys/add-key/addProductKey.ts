import 'server-only'
import { redirect } from 'next/navigation'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'
import z from 'zod'

// Zod schema for validating product key form data
const ProductKeySchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  productKey: z.string().min(1, 'Product key is required'),
  computerName: z.string().optional(),
  comment: z.string().optional(),
  usedOn: z.string().optional(),
})

export default async function addProductKey(formData: FormData): Promise<void> {
  'use server'

  const session = await requireSession()

  // Convert FormData to a plain object for Zod parsing
  const data = Object.fromEntries(formData.entries())

  // Validate and parse the form data
  const result = ProductKeySchema.safeParse(data)

  if (!result.success) {
    // Handle validation errors (you might want to pass these back to the client)
    console.error('Validation errors:', result.error.flatten())
    throw new Error('Invalid form data')
  }

  const { productName, productKey, computerName, comment, usedOn } = result.data

  // check if the product key already exists
  const existingKey = await prisma.productKey.findUnique({
    where: {
      productKey: productKey,
    },
  })
  if (existingKey) {
    throw new Error('Product key already exists')
  }

  await prisma.productKey.create({
    data: {
      uid: session.uid,
      productName,
      productKey,
      computerName: computerName || null,
      comment: comment || null,
      usedOn,
    },
  })
  redirect('/keys/')
}
