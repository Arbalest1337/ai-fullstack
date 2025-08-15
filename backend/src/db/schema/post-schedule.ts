import { integer, pgTable, text, vector, boolean } from 'drizzle-orm/pg-core'
import { primaryId, createTime } from '../custom'
import { creatorId } from '../custom/user'

export const PostScheduleTable = pgTable('post_schedule', {
  id: primaryId(),
  creatorId: creatorId(),
  createTime: createTime(),
  enable: boolean().notNull().default(false),
  triggerHour: integer().notNull().default(0),
  keywords: text().notNull(),
  embedding: vector({ dimensions: 1536 })
})
