import Container from '@/components/container'
import { getSession } from '@/server_lib/session'
import MainTitle from '@/components/main-title'
import Sidebar from '../components/Sidebar'
import db from '@/server_lib/db'
import LabsTable from './client'
import { LabResult } from '../labs-types'
import printRange, { checkLabRange } from '@/lib/lab-range-check'
import { z } from 'zod'

async function getLabResults(userId: number, sortColumn?: string): Promise<LabResult[]> {
  // validate sortColumn is one of the expected columns using zod (or coerce to null)
  const column = z
    .string()
    .refine(
      (v) =>
        [
          'test_name',
          'collection_datetime',
          'result_datetime',
          'result_status',
          'ordering_provider',
          'resulting_lab',
          'analyte',
          'value',
          'range_min',
          'range_max',
          'range_unit',
          'normal_value',
        ].includes(v),
      { message: 'Invalid sort column' },
    )
    .safeParse(sortColumn).success
    ? sortColumn
    : 'collection_datetime'
  console.info('[phr] sorted by', column)
  try {
    const results = await db.query(
      `
SELECT test_name, collection_datetime, result_datetime, result_status, 
  ordering_provider, resulting_lab, analyte, value, unit, range_min, 
  range_max, range_unit, normal_value
FROM phr_lab_results 
WHERE user_id = ?
ORDER BY ${column} DESC`,
      [userId],
    )
    return results as LabResult[]
  } finally {
    await db.end()
  }
}

export default async function LabsTablePage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const session = await getSession()
  if (!session?.ax_phr) {
    return (
      <Container>
        <MainTitle>Access denied</MainTitle>
        <h2>You don&apos;t have access to this application.</h2>
      </Container>
    )
  }

  const sp = await searchParams
  const sortColumn = typeof sp.sort === 'string' ? sp.sort : undefined
  const labResults = await getLabResults(session.uid, sortColumn)
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
    ...labResults.map((row: LabResult) => [
      row.test_name ?? '',
      row.collection_datetime?.toLocaleString() ?? '',
      row.result_datetime?.toLocaleString() ?? '',
      row.result_status ?? '',
      row.ordering_provider ?? '',
      row.resulting_lab ?? '',
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

function rangeData(row: LabResult): string {
  const { value, normal_value, range_min, range_max } = row
  const { isInRange, message } = checkLabRange({
    value,
    normal_value,
    range_min,
    range_max,
  })
  // Add the range status
  return !isInRange ? '⚠️:' + message : '✅'
}
