import 'server-only'
import { getSession } from '@/server_lib/session'
import { prisma } from '@/server_lib/prisma'

export async function getLabResults() {
  const session = await getSession()
  const userId = session?.uid
  return prisma.phrLabResult.findMany({
    where: { userId },
    orderBy: { resultDatetime: 'desc' },
  })
}
