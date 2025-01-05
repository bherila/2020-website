import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import MainTitle from '@/components/main-title'
import Container from 'react-bootstrap/Container'
import CdKeysTabBar from '@/app/keys/CdKeysTabBar'
import ProductKeyUploader from './ProductKeyUploader'
import uploadProductKeys from './actions'

export default async function ImportXmlPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
  }

  return (
    <Container>
      <MainTitle>Import XML</MainTitle>
      <CdKeysTabBar />
      <div className="pt-3">
        <p>This page takes a exported XML file of product keys from MSDN, and imports them into the database.</p>
        <ProductKeyUploader uploadAction={uploadProductKeys} />
      </div>
    </Container>
  )
}
