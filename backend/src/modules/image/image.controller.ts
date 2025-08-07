import { Controller, Get, Post, Body, Query, UsePipes } from '@nestjs/common'
import { ImageService } from 'src/modules/image/image.service'
import { GenerateImageDto, generateImageSchema } from 'src/modules/image/image.schema'
import { ZodValidationPipe } from '../../pipe/zod.pipe'

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('text-to-image')
  @UsePipes(new ZodValidationPipe(generateImageSchema))
  async textToImage(@Body() params: GenerateImageDto) {
    const res = await this.imageService.textToImage(params)
    return res
  }

  @Get('detail')
  async getImageByTaskId(@Query('id') taskId: string) {
    const res = await this.imageService.getImageByTaskId(taskId)
    return res
  }

  @Get('query')
  async getImages(@Query() params) {
    const res = await this.imageService.getImages(params)
    return res
  }
}
