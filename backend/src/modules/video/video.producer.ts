import { Logger, Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { blue } from 'chalk'

@Injectable()
export class VideoProducer {
  constructor(@InjectQueue('video-queue') private queue: Queue) {}
  private readonly logger = new Logger()

  async addToQueue(taskId: string) {
    await this.queue.add('VideoQueue', { taskId })
    this.logger.log(`${blue('NEW')} ${taskId}`, 'VideoQueue')
  }
}
