import Container from '@/components/container'
import { getSession } from '@/server_lib/session'
import MainTitle from '@/components/main-title'
import Sidebar from '../components/Sidebar'
import db from '@/server_lib/db'
import LabsTable from './client'
import { LabResult } from '../labs-types'
import { PageProps } from '.next/types/app/page'

async function getLabResults(userId: number, sortColumn?: string): Promise<LabResult[]> {
  try {
    const results = await db.query(
      `SELECT test_name,
            collection_datetime,
            result_datetime,
            result_status,
            ordering_provider,
            resulting_lab,
            analyte,
            value,
            unit,
            range_min,
            range_max,
            range_unit,
            normal_value
     FROM phr_lab_results 
     WHERE user_id = ?
     ORDER BY ${sortColumn || 'collection_datetime'} DESC`,
      [userId],
    )
    return results as LabResult[]
  } finally {
    await db.end()
  }
}

export default async function LabsTablePage({ searchParams }: PageProps) {
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
    'Unit',
    'Min',
    'Max',
    'Range Unit',
    'Normal',
    'In Range',
  ]
  const data = [
    headers,
    ...labResults.map((row) => [
      row.test_name ?? '',
      row.collection_datetime?.toLocaleString() ?? '',
      row.result_datetime?.toLocaleString() ?? '',
      row.result_status ?? '',
      row.ordering_provider ?? '',
      row.resulting_lab ?? '',
      row.analyte ?? '',
      row.value?.toString() ?? '',
      row.unit ?? '',
      row.range_min?.toString() ?? '',
      row.range_max?.toString() ?? '',
      row.range_unit ?? '',
      row.normal_value ?? '',
    ]),
  ]

  return (
    <div className="d-flex">
      <Sidebar />
      <Container>
        <MainTitle>Labs (Table)</MainTitle>
        <LabsTable data={data} />
      </Container>
    </div>
  )
}
