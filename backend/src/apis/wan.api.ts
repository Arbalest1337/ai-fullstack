import { InternalServerErrorException } from '@nestjs/common'

export enum WanVideoStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
  UNKNOWN = 'UNKNOWN'
}

export const generateWanVideo = async (prompt: string) => {
  const url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-DashScope-Async': 'enable',
      Authorization: `Bearer ${process.env.VIDEO_API_KEY}`
    },
    body: JSON.stringify({
      model: 'wan2.2-t2v-plus',
      input: {
        prompt
      }
    })
  })
  const data = await res.json()
  if (!res.ok) throw new InternalServerErrorException(data)
  return data
}

export const queryWanVideoTask = async (taskId: string) => {
  const url = `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.VIDEO_API_KEY}`
    }
  })
  const data = await res.json()
  if (!res.ok) throw new InternalServerErrorException(data)
  return data
}
