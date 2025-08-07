import { Controller, Get, Post, Body, Query, UsePipes } from '@nestjs/common'
import { VideoService } from './video.service'
import { GenerateVideoDto, generateVideoSchema } from './video.schema'
import { ZodValidationPipe } from '../../pipe/zod.pipe'

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('text-to-video')
  @UsePipes(new ZodValidationPipe(generateVideoSchema))
  async textToVideo(@Body() params: GenerateVideoDto) {
    const res = await this.videoService.textToVideo(params)
    return res
  }

  @Get('detail')
  async getVideoByTaskId(@Query('id') taskId: string) {
    const res = await this.videoService.getVideoByTaskId(taskId)
    return res
  }

  @Get('query')
  async getVideos(@Query() params) {
    const res = await this.videoService.getVideos(params)
    return res
  }
}
