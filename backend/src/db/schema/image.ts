import { integer, pgTable, timestamp, jsonb, text } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const ImageTable = pgTable('image', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  taskId: text().notNull(),
  key: text(),
  detail: jsonb(),
  prompt: text().notNull(),
  createTime: timestamp({ withTimezone: true })
    .notNull()
    .default(sql`now()`)
})
