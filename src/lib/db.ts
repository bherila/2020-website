import mysql from 'serverless-mysql'
export default mysql({
  config: {
    host: process.env.DBHOST,
    port: parseInt(process.env.DBPORT || '3306', 10),
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
  },
})
