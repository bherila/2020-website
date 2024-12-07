import 'server-only'

import AuthRoutes from '@/app/auth/AuthRoutes'
import { sql } from '@/server_lib/db'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import z from 'zod'

// Zod schema for validating product key form data
const ProductKeySchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  productKey: z.string().min(1, 'Product key is required'),
  computerName: z.string().optional(),
  comment: z.string().optional(),
  usedOn: z
    .string()
    .date()
    .optional()
    .transform((val) => (val ? new Date(val) : null)),
})

export default async function addProductKey(formData: FormData) {
  'use server'

  const session = await getSession()
  if (!session?.uid) {
    redirect(AuthRoutes.signIn)
  }

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

  try {
    await sql`
        INSERT INTO product_keys 
        (uid, product_name, product_key, computer_name, comment, used_on) 
        VALUES 
        (${session.uid}, ${productName}, ${productKey}, ${computerName || null}, ${comment || null}, ${usedOn})
      `
    redirect('/keys/')
  } catch (error) {
    console.error('Failed to add product key:', error)
    throw new Error('Failed to add product key')
  }
}
