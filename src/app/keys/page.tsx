import 'server-only'
import MainTitle from '@/components/main-title'
import CdKeysTabBar from './CdKeysTabBar'
import CdKeyClient from './CdKeyClient'
import requireSession from '@/server_lib/requireSession'
import { prisma } from '@/server_lib/prisma'

export default async function CdKeysPage() {
  const session = await requireSession()

  const productKeys = await prisma.productKey.findMany({
    where: {
      uid: session.uid,
    },
    orderBy: {
      productName: 'asc',
    },
  })

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
