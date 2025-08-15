import { db } from 'src/db'
import { UserTable } from 'src/db/schema/user'
import { UserPasswordTable } from 'src/db/schema/user-password'
import { eq } from 'drizzle-orm'

export const getUserPwdByUsername = async username => {
  const [res] = await db
    .select()
    .from(UserPasswordTable)
    .where(eq(UserPasswordTable.username, username))
    .limit(1)
  return res
}

export const createUserWidthPassword = async params => {
  const { username, password, ...userParams } = params
  const res = await db.transaction(async tx => {
    const [user] = await tx.insert(UserTable).values(userParams).returning()
    await tx.insert(UserPasswordTable).values({ userId: user.id, username, password })
    return user
  })
  return res
}
