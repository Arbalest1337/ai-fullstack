import { Module } from '@nestjs/common'
import { VideoController } from './video.controller'
import { VideoService } from './video.service'
import { BullModule } from '@nestjs/bullmq'
import { VideoConsumer } from './video.processor'

@Module({
    imports: [BullModule.registerQueue({ name: 'video' })],
    controllers: [VideoController],
    providers: [VideoService, VideoConsumer]
})
export class VideoModule {}
