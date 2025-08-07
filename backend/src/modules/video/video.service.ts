import { Injectable } from '@nestjs/common'
import { WanText2Video } from 'src/apis/wan.api'
import * as VideoSql from './video.sql'
import { S3Service } from '../s3/s3.service'
import { VideoProducer } from './video.producer'

@Injectable()
export class VideoService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly videoProducer: VideoProducer
  ) {}

  async textToVideo(params) {
    const { prompt } = params
    const res = await WanText2Video(prompt)
    await VideoSql.createVideo({ prompt, detail: res })
    await this.videoProducer.addToQueue(res.output.task_id)
    return res
  }

  async getVideoByTaskId(taskId) {
    const res = await VideoSql.getVideoByTaskId(taskId)
    return res
  }

  async getVideos(params) {
    const res = await VideoSql.getVideos(params)
    return res
  }

  async updateVideoOnSucceed(detail) {
    const { video_url } = detail.output
    const { key } = await this.s3Service.putUrl(video_url, 'video')
    await VideoSql.updateVideo({ detail, key })
  }
}
