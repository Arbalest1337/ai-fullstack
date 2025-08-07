import { Logger, Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { blue } from 'chalk'

@Injectable()
export class ImageProducer {
  constructor(@InjectQueue('image') private queue: Queue) {}
  private readonly logger = new Logger()

  async addToQueue(taskId: string) {
    await this.queue.add('ImageTask', { taskId })
    this.logger.log(`${blue('NEW')} ${taskId}`, 'ImageTask')
  }
}
