import {
  char,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { user } from './user.ts'

const statusEnum = mysqlEnum('status', ['pending', 'in_progress', 'completed'])

export const task = mysqlTable('tasks', {
  id: char({ length: 36 }).primaryKey(),
  userId: char({ length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  status: statusEnum.notNull().default('pending'),
  slug: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
})
