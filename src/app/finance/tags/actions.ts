'use server'

import { z } from 'zod'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'
import { TAG_COLORS } from './tagColors'
import { revalidatePath } from 'next/cache'

const TagSchema = z.object({
  tag_label: z.string().min(1, 'Label is required').max(50, 'Label must be 50 characters or less'),
  tag_color: z.enum(TAG_COLORS),
})

const DeleteTagSchema = z.object({
  tag_id: z.number().int().positive('Invalid tag ID'),
})

export async function createTag(formData: FormData) {
  const { uid } = await requireSession()

  const result = TagSchema.safeParse({
    tag_label: formData.get('tag_label'),
    tag_color: formData.get('tag_color'),
  })

  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  try {
    const newTag = await prisma.finAccountTag.create({
      data: {
        tag_userid: uid,
        tag_label: result.data.tag_label,
        tag_color: result.data.tag_color,
      },
    })

    return { success: true, tag: newTag }
  } catch (error) {
    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return { error: 'A tag with this label already exists' }
    }
    return { error: 'Failed to create tag' }
  }
}

export async function deleteTag(formData: FormData) {
  const { uid } = await requireSession()

  const result = DeleteTagSchema.safeParse({
    tag_id: Number(formData.get('tag_id')),
  })

  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  // Check if the tag has any associated transactions
  const tagWithTransactions = await prisma.finAccountTag.findUnique({
    where: { tag_id: result.data.tag_id },
    include: {
      _count: {
        select: {
          FinAccountLineItemTagMap: {
            where: {
              when_deleted: null,
              transaction: { when_deleted: null },
            },
          },
        },
      },
    },
  })

  if (!tagWithTransactions) {
    return { error: 'Tag not found' }
  }

  // Prevent deletion if tag has active transactions
  if (tagWithTransactions._count.FinAccountLineItemTagMap > 0) {
    return { error: 'Cannot delete a tag with active transactions' }
  }

  try {
    // Soft delete by setting when_deleted timestamp
    await prisma.finAccountTag.updateMany({
      where: {
        tag_id: result.data.tag_id,
        tag_userid: uid,
      },
      data: {
        when_deleted: new Date(),
      },
    })

    revalidatePath('/finance/tags')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete tag:', error)
    return { error: 'Failed to delete tag' }
  }
}
