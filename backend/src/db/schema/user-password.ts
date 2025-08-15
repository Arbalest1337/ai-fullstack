import { pgTable, text } from 'drizzle-orm/pg-core'
import { primaryId, createTime, ulid } from '../custom'
import { UserTable } from './user'

export const UserPasswordTable = pgTable('user_password', {
  id: primaryId(),
  username: text().notNull().unique(),
  password: text().notNull(),
  createTime: createTime(),
  userId: ulid()
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' })
})
