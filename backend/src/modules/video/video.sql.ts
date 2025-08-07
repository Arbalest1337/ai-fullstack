import { db } from 'src/db'
import { VideoTable } from 'src/db/schema/video'
import { eq } from 'drizzle-orm'

export const createVideo = async ({ prompt, detail }) => {
  const { task_id } = detail.output
  const newVideo = { prompt, taskId: task_id, detail }
  await db.insert(VideoTable).values(newVideo)
}

export const updateVideo = async ({ detail, key }) => {
  const { task_id } = detail.output
  await db.update(VideoTable).set({ detail, key }).where(eq(VideoTable.taskId, task_id))
}

export const getVideoByTaskId = async taskId => {
  const [res] = await db.select().from(VideoTable).where(eq(VideoTable.taskId, taskId))
  return key2Url(res)
}

export const getVideos = async params => {
  const res = await db.select().from(VideoTable)
  return res.map(key2Url)
}

const key2Url = item => {
  return {
    ...item,
    url: item.key ? `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${item.key}` : ''
  }
}
