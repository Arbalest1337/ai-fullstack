import { Injectable, Logger } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { generateWanVideo } from 'src/apis/wan.api'
import * as VideoSql from './video.sql'
import { blue } from 'chalk'
@Injectable()
export class VideoService {
  constructor(@InjectQueue('video') private queue: Queue) {}
  private readonly logger = new Logger()

  async addToQueue(taskId: string) {
    await this.queue.add('videoTask', { taskId })
    this.logger.log(`${blue('NEW')} ${taskId}`, 'VideoTask')
  }

  async generateVideo(params) {
    const { prompt } = params
    const res = await generateWanVideo(prompt)
    await VideoSql.createVideo({ prompt, detail: res })
    await this.addToQueue(res.output.task_id)
    return res
  }

  async getVideoByTaskId(taskId) {
    const res = await VideoSql.getVideoByTaskId(taskId)
    return res
  }

  async getVideos(params) {
    const res = await VideoSql.getVideos(params)
    return res
  }
}
