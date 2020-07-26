// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'

require('dotenv').config()

const config = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  connectionLimit: 3,
}

const pool = mysql.createPool(config)
// module.exports = pool

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query.symbol !== 'string') {
    res.statusCode = 400
    return res.json({ error: 'Missing symbol' })
  } else {
    const results = await pool.query(
      `select * from earnings_latest where symbol=? order by date asc;`,
      [req.query.symbol]
    )
    res.statusCode = 200
    return res.json(results[0])
  }
}

export default handler
