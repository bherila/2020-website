import 'server-only'
import CdKeyClient from '@/app/keys/CdKeyClient'
import MainTitle from '@/components/main-title'
import CdKeysTabBar from '@/app/keys/CdKeysTabBar'
import Container from '@/components/container'
import { getCDKeys } from './actions'
import ProductKeySchema from '@/lib/productKeySchema'

export default async function CdKeyPage() {
  const parsedRows = ProductKeySchema.array().parse(await getCDKeys())
  return (
    <Container>
      <MainTitle>License Manager</MainTitle>
      <CdKeysTabBar />
      <CdKeyClient initialRows={parsedRows} />
    </Container>
  )
}
