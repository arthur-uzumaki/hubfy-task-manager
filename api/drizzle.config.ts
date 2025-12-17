import { defineConfig } from 'drizzle-kit'
import { env } from './src/env/env.ts'

export default defineConfig({
  dialect: 'mysql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schema: './src/http/db/schema/*',
  out: './src/http/db/migrations',
  casing: 'snake_case',
})
