import { Injectable, Logger } from '@nestjs/common'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job, DelayedError } from 'bullmq'
import { blue } from 'chalk'
import { WanTaskStatus, getWanTask } from 'src/apis/wan.api'
import { ImageService } from 'src/modules/image/image.service'

@Processor('image', { concurrency: 10 })
@Injectable()
export class ImageProcessor extends WorkerHost {
  constructor(private readonly imageService: ImageService) {
    super()
  }
  private readonly logger = new Logger()

  async process(job: Job<any, any, string>) {
    const { taskId } = job.data
    const image = await getWanTask(taskId)
    const { task_status } = image.output
    if ([WanTaskStatus.PENDING, WanTaskStatus.RUNNING].includes(task_status)) {
      await job.moveToDelayed(Date.now() + 3_000)
      throw new DelayedError()
    } else if ([WanTaskStatus.SUCCEEDED, WanTaskStatus.FAILED, WanTaskStatus.CANCELED].includes(task_status)) {
      await this.imageService.updateImageOnSucceed(image)
      this.logger.log(`${blue(task_status)} ${taskId}`, 'ImageTask')
    }
  }
}
