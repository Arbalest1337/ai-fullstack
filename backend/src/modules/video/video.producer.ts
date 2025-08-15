import { Logger, Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { blue } from 'chalk'

export const VIDEO_QUEUE = 'video-queue'
@Injectable()
export class VideoProducer {
  constructor(@InjectQueue(VIDEO_QUEUE) private queue: Queue) {}
  private readonly logger = new Logger(VIDEO_QUEUE)

  async addToQueue(taskId: string) {
    await this.queue.add(`${VIDEO_QUEUE}-job`, { taskId }, { delay: 30_000 })
    this.logger.log(`${blue('JOB')} ${taskId}`)
  }
}
