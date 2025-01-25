import 'server-only'
import MainTitle from '@/components/main-title'
import requireSession from '@/server_lib/requireSession'

export default async function PayslipConfigPage() {
  await requireSession()

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>Payslip Configuration</MainTitle>
        {/* Add payslip config content here */}
      </div>
    </div>
  )
}
