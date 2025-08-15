import { Logger, Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { blue } from 'chalk'

export const IMAGE_QUEUE = 'image-queue'

@Injectable()
export class ImageProducer {
  constructor(@InjectQueue(IMAGE_QUEUE) private queue: Queue) {}
  private readonly logger = new Logger(IMAGE_QUEUE)

  async addToQueue(taskId: string) {
    await this.queue.add(`${IMAGE_QUEUE}-job`, { taskId }, { delay: 3_000 })
    this.logger.log(`${blue('JOB')} ${taskId}`)
  }
}
