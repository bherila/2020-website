/* prisma schema
model PhrLabResult {
  id                  Int      @id @default(autoincrement())
  userId              Int?     @map("user_id")
  testName            String?  @map("test_name") @db.VarChar(255)
  collectionDatetime  DateTime? @map("collection_datetime")
  resultDatetime      DateTime? @map("result_datetime")
  resultStatus        String?  @map("result_status") @db.VarChar(50)
  orderingProvider    String?  @map("ordering_provider") @db.VarChar(100)
  resultingLab        String?  @map("resulting_lab") @db.VarChar(100)
  analyte             String?  @db.VarChar(100)
  value               String?  @db.VarChar(20)
  unit                String?  @db.VarChar(20)
  rangeMin            Decimal? @map("range_min") @db.Decimal(10, 2)
  rangeMax            Decimal? @map("range_max") @db.Decimal(10, 2)
  rangeUnit           String?  @map("range_unit") @db.VarChar(20)
  normalValue         String?  @map("normal_value") @db.VarChar(50)
  messageFromProvider String?  @map("message_from_provider") @db.MediumText
  resultComment       String?  @map("result_comment") @db.MediumText
  labDirector         String?  @map("lab_director") @db.VarChar(100)
*/

import { z } from 'zod'

export const PhrLabResultSchema = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  testName: z.string().nullable(),
  collectionDatetime: z.date().nullable(),
  resultDatetime: z.date().nullable(),
  resultStatus: z.string().nullable(),
  orderingProvider: z.string().nullable(),
  resultingLab: z.string().nullable(),
  analyte: z.string().nullable(),
  value: z.string().nullable(),
  unit: z.string().nullable(),
  rangeMin: z.coerce.number().nullable(),
  rangeMax: z.coerce.number().nullable(),
  rangeUnit: z.string().nullable(),
  normalValue: z.string().nullable(),
  messageFromProvider: z.string().nullable(),
  resultComment: z.string().nullable(),
  labDirector: z.string().nullable(),
})

export type PhrLabResult = z.infer<typeof PhrLabResultSchema>
