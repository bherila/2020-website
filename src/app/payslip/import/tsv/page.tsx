import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import TsvImportClient from './TsvImportClient'

export default function Page() {
  return (
    <Container>
      <MainTitle>Import Payslips (TSV)</MainTitle>
      <TsvImportClient />
    </Container>
  )
}
