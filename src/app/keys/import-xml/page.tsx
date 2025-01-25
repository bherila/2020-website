import 'server-only'
import MainTitle from '@/components/main-title'
import CdKeysTabBar from '@/app/keys/CdKeysTabBar'
import uploadProductKeys from './actions'
import requireSession from '@/server_lib/requireSession'
import ProductKeyUploader from './ProductKeyUploader'

export default async function ImportXmlPage() {
  await requireSession()

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>Import License Keys</MainTitle>
        <CdKeysTabBar />
        <ProductKeyUploader uploadAction={uploadProductKeys} />
      </div>
    </div>
  )
}
