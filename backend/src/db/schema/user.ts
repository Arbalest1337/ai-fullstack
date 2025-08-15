import { pgTable, text } from 'drizzle-orm/pg-core'
import { primaryId, createTime } from '../custom'

export const UserTable = pgTable('user', {
  id: primaryId(),
  nickname: text(),
  createTime: createTime()
})
