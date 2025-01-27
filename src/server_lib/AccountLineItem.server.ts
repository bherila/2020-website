import 'server-only'
import { prisma } from '@/server_lib/prisma'

export async function getLineItemsByAccount(accountId: number): Promise<AccountLineItem[]> {
  return prisma.finAccountLineItems.findMany({
    where: {
      t_account: accountId,
      when_deleted: null,
    },
    orderBy: {
      t_date: 'desc',
    },
  })
}

export async function createLineItem(data: Omit<AccountLineItem, 't_id'>): Promise<AccountLineItem> {
  return prisma.finAccountLineItems.create({
    data,
  })
}

export async function bulkCreateLineItems(data: Omit<AccountLineItem, 't_id'>[]): Promise<AccountLineItem[]> {
  return prisma.finAccountLineItems
    .createMany({
      data,
    })
    .then(() => getLineItemsByAccount(data[0].t_account!))
}

export async function deleteLineItem(id: number): Promise<void> {
  await prisma.finAccountLineItems.update({
    where: { t_id: id },
    data: { when_deleted: new Date() },
  })
}
