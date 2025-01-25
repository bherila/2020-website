import 'server-only'
import MainTitle from '@/components/main-title'
import requireSession from '@/server_lib/requireSession'
import RSUPage from '../rsu/RSUPage'

export default async function OptionParserPage() {
  await requireSession()

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>Option Parser</MainTitle>
        <RSUPage />
      </div>
    </div>
  )
}
