import { db } from 'src/db'
import { UserTable } from 'src/db/schema/user'
import { eq } from 'drizzle-orm'

export const getUserById = async id => {
  const [res] = await db.select().from(UserTable).where(eq(UserTable.id, id)).limit(1)
  return res
}
