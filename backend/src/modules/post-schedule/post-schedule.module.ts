import { Module } from '@nestjs/common'
import { PostScheduleController } from './post-schedule.controller'
import { PostScheduleService } from './post-schedule.service'
import { PostModule } from '../post/post.module'
import { BullModule } from '@nestjs/bullmq'
import { PostScheduleProducer, POST_SCHEDULE_QUEUE } from './post-schedule.producer'
import { PostScheduleProcessor } from './post-schedule.processor'

@Module({
  imports: [BullModule.registerQueue({ name: POST_SCHEDULE_QUEUE }), PostModule],
  controllers: [PostScheduleController],
  providers: [PostScheduleService, PostScheduleProducer, PostScheduleProcessor]
})
export class PostScheduleModule {}
