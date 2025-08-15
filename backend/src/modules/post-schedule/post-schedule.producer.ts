import { Logger, Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { blue } from 'chalk'

export const POST_SCHEDULE_QUEUE = 'post-schedule-queue'

@Injectable()
export class PostScheduleProducer {
  constructor(@InjectQueue(POST_SCHEDULE_QUEUE) private queue: Queue) {}
  private readonly logger = new Logger(POST_SCHEDULE_QUEUE)

  async addToQueue(id: string) {
    await this.queue.add(`${POST_SCHEDULE_QUEUE}-job`, { id })
    this.logger.log(`${blue('JOB')} ${id}`)
  }
}
