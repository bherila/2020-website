import mysql from 'serverless-mysql'
export default mysql({
  config: {
    host: process.env.DBHOST,
    port: +process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
  },
})
