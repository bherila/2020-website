import 'server-only'
import MainTitle from '@/components/main-title'
import CdKeysTabBar from '@/app/keys/CdKeysTabBar'
import AddKeyClientComponent from './AddKeyClientComponent'
import addProductKey from './addProductKey'
import { prisma } from '@/server_lib/prisma'
import requireSession from '@/server_lib/requireSession'

export default async function AddKeyPage() {
  await requireSession()

  const productNames = await prisma.productKey.findMany({
    select: {
      productName: true,
    },
    distinct: ['productName'],
    where: {
      productName: {
        not: null,
      },
    },
  })

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>Add License Key</MainTitle>
        <CdKeysTabBar />
        <AddKeyClientComponent
          addProductKey={addProductKey}
          productNames={productNames.map((p) => p.productName!).filter(Boolean)}
        />
      </div>
    </div>
  )
}
