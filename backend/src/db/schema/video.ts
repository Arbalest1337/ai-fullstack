import { pgTable, jsonb, text } from 'drizzle-orm/pg-core'
import { primaryId, createTime } from '../custom'
import { creatorId } from '../custom/user'

export const VideoTable = pgTable('video', {
  id: primaryId(),
  taskId: text().notNull(),
  key: text(),
  detail: jsonb(),
  prompt: text().notNull(),
  creatorId: creatorId(),
  createTime: createTime()
})
