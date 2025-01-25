import 'server-only'
import MainTitle from '@/components/main-title'
import requireSession from '@/server_lib/requireSession'

export default async function PayslipJsonImportPage() {
  await requireSession()

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>Import Payslip JSON</MainTitle>
        {/* Add JSON import form here */}
      </div>
    </div>
  )
}
