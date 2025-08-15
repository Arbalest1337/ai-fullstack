import { pgTable, jsonb, text } from 'drizzle-orm/pg-core'
import { primaryId, createTime } from '../custom'
import { creatorId } from '../custom/user'

export const ImageTable = pgTable('image', {
  id: primaryId(),
  creatorId: creatorId(),
  createTime: createTime(),
  taskId: text().notNull(),
  key: text(),
  detail: jsonb(),
  prompt: text().notNull()
})
