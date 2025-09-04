import { Module } from '@nestjs/common'
import { VideoController } from './video.controller'
import { VideoService } from './video.service'
import { BullModule } from '@nestjs/bullmq'
import { VideoProcessor } from './video.processor'
import { S3Module } from '../s3/s3.module'
import { VideoProducer } from './video.producer'
import { QUEUE_TASK } from 'src/utils/queue'

@Module({
  imports: [BullModule.registerQueue({ name: QUEUE_TASK.VIDEO }), S3Module],
  controllers: [VideoController],
  providers: [VideoService, VideoProducer, VideoProcessor]
})
export class VideoModule {}
