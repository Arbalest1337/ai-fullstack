import { Controller, Get, Post, Query } from '@nestjs/common'
import { ImageService } from 'src/modules/image/image.service'
import { GenerateImageDto, generateImageSchema } from 'src/modules/image/image.schema'
import { CurrentUser } from 'src/decorators/currentUser.decorator'
import { Auth } from 'src/decorators/auth.decorator'
import { ZodBody } from 'src/decorators/zod-body.decorator'

@Auth()
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('text-to-image')
  async textToImage(
    @ZodBody(generateImageSchema) body: GenerateImageDto,
    @CurrentUser('id') creatorId
  ) {
    const res = await this.imageService.textToImage({ ...body, creatorId })
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
