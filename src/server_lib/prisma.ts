import 'server-only'
import { PrismaClient } from '@prisma/client'
/**
 * Prisma client instance, used to interact with the Postgres database.
 * The Prisma client is a generated class that provides a type-safe way to
 * access the database.
 *
 * The Prisma client is a singleton, so we create it once and reuse it
 * throughout the app.
 */
const prisma = new PrismaClient()

export default prisma
