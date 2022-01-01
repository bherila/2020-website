import mysql from 'mysql2/promise'
import { NextApiRequest, NextApiResponse } from 'next'

const config = {
  host: process.env.DBHOST,
  port: +process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  connectionLimit: 2,
}

const pool = mysql.createPool(config)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.query.symbol !== 'string') {
    res.statusCode = 400
    return res.json({ error: 'Missing symbol' })
  } else {
    const results = await pool.query(
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
