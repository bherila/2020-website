'use server'
import 'server-only'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/server_lib/prisma'

/**
 * Updates a CD key in the database.
 *
 * @param {number} id - The ID of the CD key to update.
 * @param {{ computerName: string | null; comment: string | null; usedOn: string | null }} data - The updated data.
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
    revalidatePath('/keys/')

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

/**
 * Deletes a CD key from the database.
 *
 * @param {number} id - The ID of the CD key to delete.
 * @returns {{ success: boolean; error?: string }} - The result of the delete operation.
 */
export async function deleteCDKey(id: number) {
  try {
    // Delete the CD key
    await prisma.productKey.delete({
      where: { id },
    })

    // Revalidate the cache
    revalidatePath('/keys/')

    // Return success
    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting CD key:', error)
    return { success: false, error: 'Failed to delete CD key' }
  }
}
