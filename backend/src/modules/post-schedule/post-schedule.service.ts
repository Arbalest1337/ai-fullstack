import { Injectable } from '@nestjs/common'
import { getEmbedding } from 'src/apis/openai/openai.api'
import * as PostScheduleSql from './post-schedule.sql'

@Injectable()
export class PostScheduleService {
  constructor() {}

  async createPostSchedule(params) {
    const { keywords, creatorId } = params
    const embedding = await getEmbedding(keywords)
    const res = await PostScheduleSql.createPostSchedule({
      keywords,
      embedding,
      creatorId,
      enable: true
    })
    return res
  }

  async getPostSchedules(params) {
    const res = await PostScheduleSql.getPostSchedules(params)
    return res
  }

  async getSimilarityPost(params) {
    const { id } = params
    const schedule = await PostScheduleSql.getPostScheduleByIdWithEmbedding(id)
    const res = await PostScheduleSql.getSimilarityPostBySchedule(schedule)
    return res
  }
}
