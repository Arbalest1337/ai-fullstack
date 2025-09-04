import { Injectable } from '@nestjs/common'
import { getEmbedding } from 'src/apis/openai/openai.api'
import * as PostSql from './post.sql'
@Injectable()
export class PostService {
  async createPost(params) {
    const { content, creatorId, media = [], scheduleId } = params
    const post = await PostSql.createPost({ content, creatorId, media, scheduleId })
    const embedding = await getEmbedding(content)
    await PostSql.createPostEmbedding({ postId: post.id, embedding })
    return post
  }

  async getPosts(params) {
    const res = await PostSql.getPosts(params)
    return res
  }

  async createRepost(params) {
    const { postId, scheduleId, creatorId } = params
    const post = await PostSql.getPostById(postId)
    if (!post) throw new Error(`Can not find post by id ${postId}`)
    const res = await PostSql.createRepost({ postId, scheduleId, creatorId })
    return res
  }

  async getRepost(params) {
    const res = await PostSql.getRepost(params)
    return res
  }

  async getPostAndRepost(params) {
    const res = await PostSql.getPostAndRepost(params)
    return res
  }
}
