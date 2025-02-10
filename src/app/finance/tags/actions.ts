'use server'

import { z } from 'zod'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'
import { TAG_COLORS } from './tagColors'

const TagSchema = z.object({
  tag_label: z.string().min(1, 'Label is required').max(50, 'Label must be 50 characters or less'),
  tag_color: z.enum(TAG_COLORS).default('gray'),
})

export async function createTag(formData: FormData) {
  const { uid } = await requireSession()

  const result = TagSchema.safeParse({
    tag_label: formData.get('tag_label'),
    tag_color: formData.get('tag_color') || 'gray',
  })

  if (!result.success) {
    return {
      error: result.error.errors[0].message,
      success: false,
    }
  }

  try {
    // Check for existing tag, including soft-deleted tags
    const existingTag = await prisma.finAccountTag.findFirst({
      where: {
        tag_label: result.data.tag_label,
        tag_userid: uid,
      },
    })

    if (existingTag) {
      // If tag exists and is soft-deleted, reactivate it
      if (existingTag.when_deleted) {
        await prisma.finAccountTag.update({
          where: { tag_id: existingTag.tag_id },
          data: {
            when_deleted: null,
            tag_color: result.data.tag_color, // Update color if needed
          },
        })

        return {
          success: true,
          tag: existingTag,
          message: 'Reactivated previously deleted tag',
        }
      }

      // If tag already exists and is active
      return {
        error: 'A tag with this label already exists',
        success: false,
      }
    }

    // Create new tag if no existing tag found
    const newTag = await prisma.finAccountTag.create({
      data: {
        tag_userid: uid,
        tag_label: result.data.tag_label,
        tag_color: result.data.tag_color,
      },
    })

    return {
      success: true,
      tag: newTag,
    }
  } catch (error) {
    console.error('Tag creation error:', error)
    return {
      error: 'Failed to create tag',
      success: false,
    }
  }
}

export async function deleteTag(formData: FormData): Promise<{ error?: string; success: boolean }> {
  const { uid } = await requireSession()

  const tagId = Number(formData.get('tag_id'))

  if (isNaN(tagId)) {
    return {
      error: 'Invalid tag ID',
      success: false,
    }
  }

  // Check if the tag has any associated transactions
  const tagWithTransactions = await prisma.finAccountTag.findUnique({
    where: { tag_id: tagId },
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
    return { error: 'Tag not found', success: false }
  }

  // Prevent deletion if tag has active transactions
  if (tagWithTransactions._count.FinAccountLineItemTagMap > 0) {
    return { error: 'Cannot delete a tag with active transactions', success: false }
  }

  try {
    // Soft delete by setting when_deleted timestamp
    await prisma.finAccountTag.updateMany({
      where: {
        tag_id: tagId,
        tag_userid: uid,
      },
      data: {
        when_deleted: new Date(),
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to delete tag:', error)
    return { error: 'Failed to delete tag', success: false }
  }
}
