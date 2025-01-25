import 'server-only'
import MainTitle from '@/components/main-title'
import requireSession from '@/server_lib/requireSession'

export default async function PayslipPdfImportPage() {
  await requireSession()

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>Import Payslip PDF</MainTitle>
        {/* Add PDF import form here */}
      </div>
    </div>
  )
}
