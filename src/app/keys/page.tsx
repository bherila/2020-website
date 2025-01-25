import 'server-only'
import MainTitle from '@/components/main-title'
import CdKeysTabBar from './CdKeysTabBar'
import CdKeyClient from './CdKeyClient'
import requireSession from '@/server_lib/requireSession'
import { prisma } from '@/server_lib/prisma'

export default async function CdKeysPage() {
  await requireSession()

  const productKeys = (
    await prisma.productKey.findMany({
      orderBy: {
        productName: 'asc',
      },
    })
  ).map((key) => ({
    id: key.id,
    uid: key.uid,
    product_id: key.productId || null,
    product_name: key.productName || null,
    product_key: key.productKey || null,
    computer_name: key.computerName || null,
    comment: key.comment || null,
    used_on: key.usedOn || null,
  }))

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>License Keys</MainTitle>
        <CdKeysTabBar />
        <CdKeyClient initialRows={productKeys} />
      </div>
    </div>
  )
}
