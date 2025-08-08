import { Injectable, Logger } from '@nestjs/common'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job, DelayedError } from 'bullmq'
import { blue, red } from 'chalk'
import { WanTaskStatus, getWanTask } from 'src/apis/wan.api'
import { VideoService } from './video.service'

@Processor('video-queue', { concurrency: 10 })
@Injectable()
export class VideoProcessor extends WorkerHost {
  constructor(private readonly videoService: VideoService) {
    super()
  }
  private readonly logger = new Logger()

  async process(job: Job<any, any, string>) {
    const { taskId } = job.data
    const video = await getWanTask(taskId)
    const { task_status } = video.output
    if ([WanTaskStatus.PENDING, WanTaskStatus.RUNNING].includes(task_status)) {
      await job.moveToDelayed(Date.now() + 10_000)
      throw new DelayedError()
    } else if (task_status === WanTaskStatus.SUCCEEDED) {
      await this.videoService.onVideoSucceed(video)
      this.logger.log(`${blue(task_status)} ${taskId}`, 'VideoQueue')
    } else if ([WanTaskStatus.FAILED, WanTaskStatus.CANCELED, WanTaskStatus.UNKNOWN].includes(task_status)) {
      await this.videoService.onVideoFailed(video)
      this.logger.log(`${red(task_status)} ${taskId}`, 'VideoQueue')
    }
  }
}
