import { Injectable } from '@nestjs/common'
import { WanText2Image } from 'src/apis/wan.api'
import * as ImageSql from './image.sql'
import { S3Service } from '../s3/s3.service'
import { ImageProducer } from './image.producer'

@Injectable()
export class ImageService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imageProducer: ImageProducer
  ) {}

  async textToImage(params) {
    const { prompt } = params
    const res = await WanText2Image(prompt)
    await ImageSql.createImage({ prompt, detail: res })
    await this.imageProducer.addToQueue(res.output.task_id)
    return res
  }

  async getImageByTaskId(taskId) {
    const res = await ImageSql.getImageByTaskId(taskId)
    return res
  }

  async getImages(params) {
    const res = await ImageSql.getImages(params)
    return res
  }

  async updateImageOnSucceed(detail) {
    const { url } = detail.output.results[0]
    const { key } = await this.s3Service.putUrl(url, 'image')
    await ImageSql.updateImage({ detail, key })
  }
}
