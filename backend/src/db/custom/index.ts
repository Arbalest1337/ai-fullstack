import { customType, timestamp } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const ulid = (name?: string) =>
  customType<{ data: string; driverData: string }>({
    dataType() {
      return 'char(26)'
    }
  })(name)

export const primaryId = (name?: string) =>
  ulid(name)
    .primaryKey()
    .default(sql`gen_ulid()`)

export const createTime = (name?: string) =>
  timestamp(name, { withTimezone: true })
    .notNull()
    .default(sql`now()`)
