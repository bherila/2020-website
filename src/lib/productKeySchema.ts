import { z } from 'zod'

const ProductKeySchema = z.object({
  id: z.number().optional(),
  uid: z.number().nullable(),
  product_id: z.string().max(100).nullable(),
  product_key: z.string().max(2000).nullable(),
  product_name: z.string().max(100).nullable(),
  computer_name: z.string().max(100).nullable(),
  comment: z.string().max(2000).nullable(),
  used_on: z.coerce.date().nullable(),
})

export default ProductKeySchema
