'use server'

import { z } from 'zod'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'
import { TAG_COLORS } from './tagColors'

const TagSchema = z.object({
  tag_label: z.string().min(1, 'Label is required').max(50, 'Label must be 50 characters or less'),
  tag_color: z.enum(TAG_COLORS),
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
