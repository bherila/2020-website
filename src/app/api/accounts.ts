import { NextApiRequest, NextApiResponse } from 'next'

import { AccountRecord } from '@/lib/AccountRecord'
import pool from '@/server_lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req?.method == null) {
    res.status(400)
    return
  }
  const method = req.method.toLowerCase()
  if (method === 'post') {
    // CREATE api
    try {
      const account = new AccountRecord(req.body)
      await pool.query('insert into accounts (acct_id, acct_owner, acct_name) values (?, ?, ?)', [
        account.acct_id,
        account.acct_owner,
        account.acct_name,
      ])
      return res.json({ message: 'ok' })
    } catch (err) {
      res.statusCode = 400
      return res.json({ message: err })
    }
  }

  if (method === 'get') {
    const rows = (await pool.query('select acct_id, acct_owner, acct_name from accounts')) as any[]
    const result = rows?.map((row) => new AccountRecord(row))
    res.statusCode = 200
    return res.json({ t_data: result })
  }

  res.statusCode = 400
  return res.json({ error: 'Unknown method ' + method })
}
