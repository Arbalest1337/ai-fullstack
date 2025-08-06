import { integer, varchar, pgTable, timestamp, jsonb, text } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const VideoTable = pgTable('video', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  taskId: text().notNull(),
  detail: jsonb(),
  prompt: text().notNull(),
  createTime: timestamp({ withTimezone: true })
    .notNull()
    .default(sql`now()`)
})
