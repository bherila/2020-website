import { Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ProductKeyType {
  @Field(() => ID, { name: 'id', nullable: false })
  id?: string

  @Field(() => ID, { name: 'uid', nullable: true })
  uid?: string

  @Field({ name: 'product_id', nullable: true })
  product_id?: string

  @Field({ name: 'product_key', nullable: true })
  product_key?: string

  @Field({ name: 'product_name', nullable: true })
  product_name?: string

  @Field({ name: 'computer_name', nullable: true })
  computer_name?: string

  @Field({ name: 'comment', nullable: true })
  comment?: string

  @Field({ name: 'used_on', nullable: true })
  used_on?: Date

  @Field({ name: 'claimed_date', nullable: true })
  claimed_date?: Date

  @Field({ name: 'key_type', nullable: true })
  key_type?: string

  @Field({ name: 'key_retrieval_note', nullable: true })
  key_retrieval_note?: string
}

@Resolver(ProductKeyType)
export class ProductKeyResolver {
  @Query((returns) => [ProductKeyType], { name: 'cd_key_list' })
  async getProductKeys(@Ctx() vc: any) {
    const db = (await import('@/server_lib/db')).default
    const rows = await db.query('SELECT * FROM product_keys') as any[]
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
      key_retrieval_note: row.key_retrieval_note
    }))
  }

  @Mutation((returns) => ProductKeyType, { name: 'cd_key_create' })
  addProductKey(newProductKey: ProductKeyType, @Ctx() vc: any): ProductKeyType {
    return newProductKey
  }
}
