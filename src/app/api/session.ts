import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@/server_lib/session'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession()
    res.status(200).json(session)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session data' })
  }
}
