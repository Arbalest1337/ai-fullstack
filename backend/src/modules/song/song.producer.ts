import { Logger, Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { blue } from 'chalk'
import { QUEUE_TASK } from 'src/utils/queue'

@Injectable()
export class SongProducer {
  constructor(@InjectQueue(QUEUE_TASK.SONG) private queue: Queue) {}
  private readonly logger = new Logger(QUEUE_TASK.SONG)

  async addToQueue(taskId: string) {
    await this.queue.add(
      `${QUEUE_TASK.SONG}-job`,
      { taskId },
      {
        delay: 20_000,
        attempts: 2,
        backoff: {
          type: 'fixed',
          delay: 20_000
        }
      }
    )
    this.logger.log(`${blue('NEW')} ${taskId}`)
  }
}
