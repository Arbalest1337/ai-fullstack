import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { createPostSchema, CreatePostDto } from './post.schema'
import { PostService } from './post.service'
import { CurrentUser } from 'src/decorators/currentUser.decorator'
import { Auth } from 'src/decorators/auth.decorator'
import { ZodBody } from 'src/decorators/zod-body.decorator'

@Auth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@ZodBody(createPostSchema) body: CreatePostDto, @CurrentUser() user) {
    const res = await this.postService.createPost({ ...body, creatorId: user.id })
    return res
  }

  @Get('query')
  async getPosts(@Query() query) {
    const res = await this.postService.getPosts(query)
    return res
  }

  @Post('repost')
  async createRepost(@Body() body, @CurrentUser() user) {
    const res = await this.postService.createRepost({ ...body, creatorId: user.id })
    return res
  }

  @Get('query-repost')
  async getRepost(@Query() query) {
    const res = await this.postService.getRepost(query)
    return res
  }

  @Get('query-post-and-repost')
  async getPostAndRepost(@Query() query) {
    const res = await this.postService.getPostAndRepost(query)
    return res
  }
}
