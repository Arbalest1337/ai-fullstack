import { db } from 'src/db'
import { VideoTable } from 'src/db/schema/video'
import { eq } from 'drizzle-orm'

export const createVideo = async ({ prompt, detail }) => {
  const { task_id } = detail.output
  const newVideo = { prompt, taskId: task_id, detail }
  await db.insert(VideoTable).values(newVideo)
}

export const updateVideo = async detail => {
  const { task_id } = detail.output
  await db.update(VideoTable).set({ detail }).where(eq(VideoTable.taskId, task_id))
}

export const getVideoByTaskId = async taskId => {
  const [res] = await db.select().from(VideoTable).where(eq(VideoTable.taskId, taskId))
  return res
}

export const getVideos = async params => {
  const res = await db.select().from(VideoTable)
  return res
}
