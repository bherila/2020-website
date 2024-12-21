import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, saveSession } from '@/server_lib/session'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession()
    await saveSession(session)
    res.status(200).json(session)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session data' })
  }
}
