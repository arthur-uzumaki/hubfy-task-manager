import z from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().positive().default(3333),
  BASE_WEB_URL: z.url(),
})

export const env = envSchema.parse(process.env)
