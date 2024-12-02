import { z } from 'zod'
import productKeySchema from '@/lib/productKeySchema'

export type CDKey = z.infer<typeof productKeySchema>

export interface GroupedCDKeys {
  [productName: string]: CDKey[]
}

export interface EditCDKeyFormData {
  computer_name: string
  comment: string
  used_on: string
}
