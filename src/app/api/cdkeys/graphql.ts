import { Arg, Ctx, ID, InputType, Mutation, Query, Resolver } from 'type-graphql'
import { Field, ObjectType } from 'type-graphql'
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

@ObjectType()
export class ProductKeyType {
  @Field(() => ID, { name: 'id', nullable: false })
  id?: string

  @Field(() => ID, { name: 'uid', nullable: false })
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
  used_on?: string
}

@Resolver(ProductKeyType)
export class ProductKeyResolver {
  @Query((returns) => [ProductKeyType], { name: 'cd_key_list' })
  getProductKeys(@Ctx() vc: any) {
    return []
  }

  @Mutation((returns) => ProductKeyType, { name: 'cd_key_create' })
  addProductKey(newProductKey: ProductKeyType, @Ctx() vc: any): ProductKeyType {
    return newProductKey
  }
}
