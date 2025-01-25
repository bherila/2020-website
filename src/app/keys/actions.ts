'use server'
import 'server-only'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/server_lib/prisma'

/**
 * Updates a CD key in the database.
 *
 * @param {number} id - The ID of the CD key to update.
 * @param {{ computer_name: string | null; comment: string | null; used_on: string | null }} data - The updated data.
 * @returns {{ success: boolean; updatedRow: any; error?: string }} - The result of the update operation.
 */
export async function updateCDKey(
  id: number,
  data: { computerName: string | null; comment: string | null; usedOn: string | null },
) {
  try {
    // Update the CD key
    const updatedRow = await prisma.productKey.update({
      where: { id },
      data: {
        computerName: data.computerName,
        comment: data.comment,
        usedOn: data.usedOn,
      },
    })

    // Revalidate the cache
    revalidatePath('/cdkeys')

    // Return the updated row
    return {
      success: true,
      updatedRow,
    }
  } catch (error) {
    console.error('Error updating CD key:', error)
    return { success: false, error: 'Failed to update CD key' }
  }
}
