import 'server-only'
import ImportTransactionsClient from './ImportTransactionsClient'
import { z } from 'zod'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

const ImportTransactionsPage = async ({ params }: { params: Promise<{ account_id: string }> }) => {
  const { uid } = await requireSession()
  const _param = await params
  const account = await prisma.finAccounts.findUnique({
    where: {
      acct_id: Number(_param.account_id),
      acct_owner: uid,
    },
    select: {
      acct_name: true,
    },
  })
  const account_name = account?.acct_name
  if (!account_name) {
    throw new Error('account not found')
  }
  const account_id = z.coerce.number().parse((await params).account_id)
  return <ImportTransactionsClient id={account_id} accountName={account_name} />
}

export default ImportTransactionsPage
