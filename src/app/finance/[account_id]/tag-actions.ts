'use server'

import { z } from 'zod'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

// Zod schema for tag application
const ApplyTagSchema = z.object({
  tag_id: z.coerce.number().int().positive('Invalid tag ID'),
  transaction_ids: z.string().transform((val) =>
    val
      .split(',')
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id)),
  ),
})

export async function getUserTags() {
  const { uid } = await requireSession()

  // Fetch non-deleted tags for the user
  return await prisma.finAccountTag.findMany({
    where: {
      tag_userid: uid,
      when_deleted: null,
    },
    select: {
      tag_id: true,
      tag_label: true,
      tag_color: true,
    },
  })
}

export async function applyTagToTransactions(formData: FormData) {
  const { uid } = await requireSession()

  const result = ApplyTagSchema.safeParse({
    tag_id: formData.get('tag_id'),
    transaction_ids: formData.get('transaction_ids')?.toString() || '',
  })
  console.info('Applying tag to transactions:', result)

  if (!result.success) {
    const res = {
      error: result.error.errors[0].message,
      success: false,
    }
    console.error(res)
    return res
  }

  try {
    // Validate tag belongs to user
    const tag = await prisma.finAccountTag.findFirst({
      where: {
        tag_id: result.data.tag_id,
        tag_userid: uid,
      },
    })

    if (!tag) {
      return {
        error: 'Tag not found or does not belong to user',
        success: false,
      }
    }

    // Batch create tag mappings, avoiding duplicates
    const tagMappings = await prisma.$transaction(
      result.data.transaction_ids.map((transactionId) =>
        prisma.finAccountLineItemTagMap.upsert({
          where: {
            t_id_tag_id: {
              t_id: transactionId,
              tag_id: result.data.tag_id,
            },
          },
          update: {
            when_deleted: null, // Restore if previously soft-deleted
          },
          create: {
            t_id: transactionId,
            tag_id: result.data.tag_id,
          },
        }),
      ),
    )

    return {
      success: true,
      tagMappings,
    }
  } catch (error) {
    console.error('Failed to apply tags:', error)
    return {
      error: 'Failed to apply tags',
      success: false,
    }
  }
}
