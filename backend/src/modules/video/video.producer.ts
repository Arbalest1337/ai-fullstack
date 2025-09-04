import { Logger, Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { blue } from 'chalk'
import { QUEUE_TASK } from 'src/utils/queue'

@Injectable()
export class VideoProducer {
  constructor(@InjectQueue(QUEUE_TASK.VIDEO) private queue: Queue) {}
  private readonly logger = new Logger(QUEUE_TASK.VIDEO)

  async addToQueue(taskId: string) {
    await this.queue.add(
      `${QUEUE_TASK.VIDEO}-job`,
      { taskId },
      {
        delay: 30_000,
        attempts: 2,
        backoff: {
          type: 'fixed',
          delay: 30_000
        }
      }
    )
    this.logger.log(`${blue('NEW')} ${taskId}`)
  }
}
