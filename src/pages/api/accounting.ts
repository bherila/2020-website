import mysql from 'mysql2/promise'
import { NextApiRequest, NextApiResponse } from 'next'

import { AccountingDbRow } from '../../lib/accounting-row'

const config = {
  host: process.env.DBHOST,
  port: +process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  connectionLimit: 2,
}

const pool = mysql.createPool(config)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method.toLowerCase()
  if (method === 'post') {
    // CREATE api
    const tData: any[] | undefined = req.body?.t_data
    if (Array.isArray(tData)) {
      const db_rows: AccountingDbRow[] = tData.map((row) =>
        Object.assign(new AccountingDbRow(), row),
      )
      await pool.query(
        AccountingSQL.insert,
        db_rows.map((r) => r.valuesForInsert()),
      )
      res.statusCode = 200
      return res.json('ok')
    }

    res.statusCode = 400
    return res.json({ error: 'Missing symbol' })
  }

  if (method === 'get') {
    const rows = await pool.query(AccountingSQL.select)
    res.statusCode = 200
    return res.json({ t_data: rows[0] })
  }

  res.statusCode = 400
  return res.json({ error: 'Unknown method ' + method })
}

const AccountingSQL = {
  insert: `INSERT INTO accounting (
      t_account,
      t_date,
      t_type,
      t_symbol,
      t_qty,
      t_amt,
      t_price,
      t_commission,
      t_fee,
      t_method,
      t_source,
      t_origin,
      t_description,
      t_comment,
      opt_expiration,
      opt_type,
      opt_strike
    ) VALUES ?`,
  select: `SELECT * from accounting LIMIT 10000`,
}
