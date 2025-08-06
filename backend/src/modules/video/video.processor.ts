import { Injectable, Logger } from '@nestjs/common'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job, DelayedError } from 'bullmq'
import { blue } from 'chalk'
import { WanVideoStatus, queryWanVideoTask } from 'src/apis/wan.api'
import { updateVideo } from './video.sql'
@Processor('video')
@Injectable()
export class VideoConsumer extends WorkerHost {
  private readonly logger = new Logger()

  async process(job: Job<any, any, string>) {
    const { taskId } = job.data
    const data = await queryWanVideoTask(taskId)
    const { task_status } = data.output
    if ([WanVideoStatus.PENDING, WanVideoStatus.RUNNING].includes(task_status)) {
      await job.moveToDelayed(Date.now() + 5_000)
      throw new DelayedError()
    } else if ([WanVideoStatus.SUCCEEDED, WanVideoStatus.FAILED, WanVideoStatus.CANCELED].includes(task_status)) {
      await updateVideo(data)
      this.logger.log(`${blue(task_status)} ${taskId}`, 'VideoTask')
    }
  }
}
