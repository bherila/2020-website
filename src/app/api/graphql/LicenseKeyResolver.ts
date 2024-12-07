import { Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { LicenseKeyType } from './LicenseKeyType'

@Resolver(LicenseKeyType)
export class LicenseKeyResolver {
  @Query((returns) => [LicenseKeyType], { name: 'license_key_list' })
  async getProductKeys(@Ctx() vc: any) {
    const db = (await import('@/server_lib/db')).default
    const rows = (await db.query('SELECT * FROM product_keys')) as any[]
    return rows.map((row: any) => ({
      id: row.id?.toString(),
      uid: row.uid?.toString(),
      product_id: row.product_id,
      product_key: row.product_key,
      product_name: row.product_name,
      computer_name: row.computer_name,
      comment: row.comment,
      used_on: row.used_on ? new Date(row.used_on) : null,
      claimed_date: row.claimed_date ? new Date(row.claimed_date) : null,
      key_type: row.key_type,
      key_retrieval_note: row.key_retrieval_note,
    }))
  }

  @Mutation((returns) => LicenseKeyType, { name: 'license_key_create' })
  addProductKey(newProductKey: LicenseKeyType, @Ctx() vc: any): LicenseKeyType {
    return newProductKey
  }
}
