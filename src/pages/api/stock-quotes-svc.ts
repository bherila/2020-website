import { NextApiRequest, NextApiResponse } from 'next'

import mysql from '../../lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.query.symbol !== 'string') {
    res.statusCode = 400
    return res.json({ error: 'Missing symbol' })
  } else {
    const results = await mysql.query(
      `select *
       from earnings_latest
       where symbol = ?
       order by date`,
      [req.query.symbol],
    )
    res.statusCode = 200
    return res.json(results[0])
  }
}

export default handler
