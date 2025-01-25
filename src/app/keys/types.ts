import { ProductKey } from '@/lib/prisma-generated-zod'

export interface GroupedCDKeys {
  [productName: string]: ProductKey[]
}

export interface EditCDKeyFormData {
  computerName: string
  comment: string
  usedOn: string
}
