'use server'
import 'server-only'
import { db } from '@/server_lib/db'
import { revalidatePath } from 'next/cache'
import requireSession from '@/server_lib/requireSession'

export async function getCDKeys() {
  const session = await requireSession('/keys')
  const rows = await db.selectFrom('product_keys').selectAll().where('uid', '=', session.uid).execute()
  return rows
}

export async function updateCDKey(
  id: number,
  data: { computer_name: string | null; comment: string | null; used_on: string | null },
) {
  const session = await requireSession('/keys')
  try {
    const updatedRow = await db
      .updateTable('product_keys')
      .set({
        computer_name: data.computer_name,
        comment: data.comment,
        used_on: data.used_on,
      })
      .where('id', '=', id)
      .where('uid', '=', session.uid)
      .returningAll()
      .executeTakeFirst()

    revalidatePath('/cdkeys')
    return {
      success: true,
      updatedRow,
    }
  } catch (error) {
    console.error('Error updating CD key:', error)
    return { success: false, error: 'Failed to update CD key' }
  }
}
