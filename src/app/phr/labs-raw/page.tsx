import 'server-only'
import Container from '@/components/container'
import { getSession } from '@/server_lib/session'
import MainTitle from '@/components/main-title'
import Sidebar from '../components/Sidebar'
import LabsTable from './client'
import printRange, { checkLabRange } from '@/lib/lab-range-check'
import SerializeLabResult from '../SerializeLabResult.server'
import { PhrLabResult } from '../PhrLabResult.types'
import { genLabResultsForLoggedInUser } from '../PhrLabResult.db'

export default async function LabsTablePage() {
  const session = await getSession()
  if (!session?.ax_phr) {
    return (
      <Container>
        <MainTitle>Access denied</MainTitle>
        <h2>You don&apos;t have access to this application.</h2>
      </Container>
    )
  }

  const labResults: PhrLabResult[] = await genLabResultsForLoggedInUser()

  // convert to string[][] for Table2D
  const headers = [
    'Test Name',
    'Collection Date',
    'Result Date',
    'Status',
    'Provider',
    'Lab',
    'Analyte',
    'Value',
    'Range',
    'Normal Value',
  ]
  const data = [
    headers,
    ...labResults.map((row) => [
      row.testName ?? '',
      row.collectionDatetime?.toLocaleDateString() ?? '',
      row.resultDatetime?.toLocaleDateString() ?? '',
      row.resultStatus ?? '',
      row.orderingProvider ?? '',
      row.resultingLab ?? '',
      row.analyte ?? '',
      `${row.value ?? ''} ${row.unit ?? ''}`.trim(),
      printRange(row),
      rangeData(row),
    ]),
  ]

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid={true}>
        <MainTitle>Labs (Raw)</MainTitle>
        <LabsTable data={data} />
      </Container>
    </div>
  )
}

function rangeData(row: PhrLabResult): string {
  const { value, normalValue, rangeMin, rangeMax } = row
  const { isInRange, message } = checkLabRange({
    value,
    normalValue,
    rangeMin: rangeMin ?? null,
    rangeMax: rangeMax ?? null,
  })
  // Add the range status
  return !isInRange ? '⚠️:' + message : '✅'
}
