import 'server-only'
import mysql from 'serverless-mysql'

const db = mysql({
  library: require('mysql2'),
  config: {
    host: process.env.DBHOST,
    port: parseInt(process.env.DBPORT || '3306', 10),
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
  },
})

export async function sql(strings: TemplateStringsArray, ...values: any[]) {
  try {
    const query = strings.reduce((prev, curr, i) => `${prev}${curr}${values[i] !== undefined ? '?' : ''}`, '')

    const results = await db.query(
      query,
      values.filter((v) => v !== undefined),
    )
    return results
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  } finally {
    await db.end()
  }
}

export default db
