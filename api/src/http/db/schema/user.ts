import { char, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('users', {
  id: char({ length: 36 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})
