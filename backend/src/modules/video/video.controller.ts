import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { VideoService } from './video.service'
import { GenerateVideoDto, generateVideoSchema } from './video.schema'
import { CurrentUser } from 'src/decorators/currentUser.decorator'
import { Auth } from 'src/decorators/auth.decorator'
import { ZodBody } from 'src/decorators/zod-body.decorator'

@Auth()
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('text-to-video')
  async textToVideo(@ZodBody(generateVideoSchema) params: GenerateVideoDto, @CurrentUser() user) {
    const res = await this.videoService.textToVideo({ ...params, creatorId: user.id })
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
