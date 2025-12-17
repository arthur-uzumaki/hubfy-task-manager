import { drizzle } from 'drizzle-orm/mysql2'
import { env } from '../../env/env.ts'

export const db = drizzle(env.DATABASE_URL, {
  casing: 'snake_case',
  logger: env.NODE_ENV === 'development',
})
