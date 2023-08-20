import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'

import { AccountingDbRow, TransactionTypes } from '../../lib/accounting-row'
import pool from '../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method.toLowerCase()
  if (method === 'post') {
    // CREATE api
    const tData: any[] | undefined = req.body?.t_data
    try {
      if (Array.isArray(tData)) {
        const db_rows: AccountingDbRow[] = tData.map(
          (row) => Object.assign({}, row) as AccountingDbRow,
        )
        await pool.query(AccountingSQL.insert, [
          db_rows.map((r) => valuesForInsert(r)),
        ])
        res.statusCode = 200
        return res.json({ message: 'ok' })
      }
    } catch (err) {
      res.statusCode = 400
      return res.json({ message: err })
    }

    res.statusCode = 400
    return res.json({ error: 'Missing symbol' })
  }

  if (method === 'get') {
    const rows = await pool.query(
      AccountingSQL.select(
        typeof req.query.requestRequireColumns === 'string'
          ? req.query.requestRequireColumns
          : null,
      ),
    )
    for (const row of rows[0] as AccountingDbRow[]) {
      if (row.t_date) {
        row.t_date = moment(row.t_date).format('YYYY-MM-DD')
      }
      if (row.t_from) {
        row.t_from = moment(row.t_from).format('YYYY-MM-DD')
      }
      if (row.t_to) {
        row.t_to = moment(row.t_to).format('YYYY-MM-DD')
      }
    }
    res.statusCode = 200
    return res.json({ t_data: rows[0] })
  }

  res.statusCode = 400
  return res.json({ error: 'Unknown method ' + method })
}

const db_cols = [
  't_account',
  't_date',
  't_type',
  't_symbol',
  't_qty',
  't_amt',
  't_price',
  't_commission',
  't_fee',
  't_method',
  't_source',
  't_origin',
  't_description',
  't_comment',
  't_from',
  't_to',
  't_interest_rate',
  'opt_expiration',
  'opt_type',
  'opt_strike',
]

const AccountingSQL = {
  insert: `INSERT INTO accounting (${db_cols.join(',')}) VALUES ?`,
  select: (requestRequireColumns: null | string) => {
    if (requestRequireColumns) {
      const nn = requestRequireColumns.toLowerCase().split(',').filter(Boolean)
      const condition = db_cols
        .filter((col) => nn.includes(col))
        .map((col) => `(${col} is not null)`)
        .join(' and ')
      return `SELECT * from accounting WHERE ${condition} ORDER BY t_date LIMIT 10000`
    }
    return `SELECT * from accounting ORDER BY t_date LIMIT 10000`
  },
}

function resolveType(type?: string): string | null {
  if (typeof type !== 'string') {
    return null
  }
  const tlc = type.toLowerCase()
  return TransactionTypes.find((r) => r.toLowerCase() == tlc)
}

function valuesForInsert(row: AccountingDbRow): (string | number)[] {
  return [
    row.t_account || 'default',
    row.t_date || moment().format('YYYY-MM-DD'),
    resolveType(row.t_type),
    row.t_symbol,
    row.t_qty || 0,
    row.t_amt || 0,
    row.t_price || 0,
    row.t_commission || 0,
    row.t_fee || 0,
    row.t_method,
    row.t_source,
    row.t_origin,
    row.t_description,
    row.t_comment,
    row.t_from,
    row.t_to,
    row.t_interest_rate,
    row.opt_expiration,
    row.opt_type,
    row.opt_strike || 0,
  ]
}
