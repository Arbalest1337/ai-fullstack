import { Logger, Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { blue } from 'chalk'
import { QUEUE_TASK } from 'src/utils/queue'

@Injectable()
export class PostScheduleProducer {
  constructor(@InjectQueue(QUEUE_TASK.POST_SCHEDULE) private queue: Queue) {}
  private readonly logger = new Logger(QUEUE_TASK.POST_SCHEDULE)

  async addToQueue(id: string) {
    await this.queue.add(`${QUEUE_TASK.POST_SCHEDULE}-job`, { id })
    this.logger.log(`${blue('NEW')} ${id}`)
  }
}
