import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BullModule } from '@nestjs/bullmq'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionFilter } from './middleware/exception.filter'
import { VideoModule } from './modules/video/video.module'
import { S3Module } from './modules/s3/s3.module'
import { ImageModule } from './modules/image/image.module'

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        // host: 'localhost',
        // port: 6379,
        url: process.env.REDIS_URL
      }
    }),
    S3Module,
    VideoModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    },
    AppService
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
