'use server'
import 'server-only'
import db from '@/server_lib/db'
import { revalidatePath } from 'next/cache'

export async function updateCDKey(
  id: number,
  data: { computer_name: string | null; comment: string | null; used_on: string | null },
) {
  try {
    await db.query(
      `UPDATE product_keys 
       SET computer_name = ?, 
           comment = ?,
           used_on = ?
       WHERE id = ?`,
      [data.computer_name, data.comment, data.used_on, id],
    )
    revalidatePath('/cdkeys')
    const q: any[] = (await db.query('SELECT * FROM product_keys WHERE id = ?', [id])) ?? []
    return {
      success: true,
      updatedRow: q[0],
    }
  } catch (error) {
    console.error('Error updating CD key:', error)
    return { success: false, error: 'Failed to update CD key' }
  }
}
