import 'server-only'
import { createPool } from 'mysql2' // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from 'kysely'
import { DB } from './kysely'

const dialect = new MysqlDialect({
  pool: createPool({
    uri: process.env.DATABASE_URL,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD || '',
    port: process.env.DBPORT ? parseInt(process.env.DBPORT) : 3306,
    connectionLimit: 2,
  }),
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
})
