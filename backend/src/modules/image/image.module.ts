import { Module } from '@nestjs/common'
import { ImageController } from './image.controller'
import { ImageService } from './image.service'
import { BullModule } from '@nestjs/bullmq'
import { ImageProducer } from './image.producer'
import { ImageProcessor } from './image.processor'
import { S3Module } from '../s3/s3.module'

@Module({
  imports: [BullModule.registerQueue({ name: 'image-queue' }), S3Module],
  controllers: [ImageController],
  providers: [ImageService, ImageProducer, ImageProcessor]
})
export class ImageModule {}
