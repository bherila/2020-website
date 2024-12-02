import Container from '@/components/container'
import { getSession } from '@/server_lib/session'
import MainTitle from '@/components/main-title'
import Sidebar from '../components/Sidebar'
import db from '@/server_lib/db'
import { LabResult } from '../labs-types'
import LabsCards from './client'

async function getLabResults(userId: number): Promise<LabResult[]> {
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
     ORDER BY result_datetime DESC`,
      [userId],
    )
    return results as LabResult[]
  } finally {
    await db.end()
  }
}

export default async function LabsFriendlyPage() {
  const session = await getSession()
  if (!session?.ax_phr) {
    return (
      <Container>
        <MainTitle>Access denied</MainTitle>
        <h2>You don&apos;t have access to this application.</h2>
      </Container>
    )
  }

  const labResults = await getLabResults(session.uid)

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid={true}>
        <MainTitle>Labs (Tiles)</MainTitle>
        <LabsCards results={labResults} />
      </Container>
    </div>
  )
}
