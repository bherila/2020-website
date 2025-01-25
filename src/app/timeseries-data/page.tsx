import 'server-only'
import MainTitle from '@/components/main-title'
import requireSession from '@/server_lib/requireSession'

export default async function TimeseriesDataPage() {
  await requireSession()

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>Timeseries Data</MainTitle>
        {/* Add timeseries data content here */}
      </div>
    </div>
  )
}
