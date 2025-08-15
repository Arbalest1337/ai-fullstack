import { Injectable, Logger } from '@nestjs/common'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { POST_SCHEDULE_QUEUE } from './post-schedule.producer'
import { getPostScheduleByIdWithEmbedding, getSimilarityPostBySchedule } from './post-schedule.sql'
import { red, blue } from 'chalk'
import { PostService } from '../post/post.service'
import { generatePost } from 'src/apis/openai/openai.api'
import { creatorId } from 'src/db/custom/user'

@Processor(POST_SCHEDULE_QUEUE, { concurrency: 10 })
@Injectable()
export class PostScheduleProcessor extends WorkerHost {
  constructor(private readonly postService: PostService) {
    super()
  }
  private readonly logger = new Logger(POST_SCHEDULE_QUEUE)

  async process(job: Job<any, any, string>) {
    try {
      const { id } = job.data
      const schedule = await getPostScheduleByIdWithEmbedding(id)
      if (!schedule.enable) {
        this.logger.log(`${red('SCHEDULE DISABLED')} ${id}`)
        return
      }
      const [similarPost] = await getSimilarityPostBySchedule(schedule)
      if (similarPost) {
        // repost
        const newRepost = await this.postService.createRepost({
          postId: similarPost.post.id,
          scheduleId: id,
          creatorId: schedule.creatorId
        })
        this.logger.log(`${blue('REPOST')} ${newRepost.id}`)
      } else {
        // new post
        const content = await generatePost({ prompt: schedule.keywords })
        const newPost = await this.postService.createPost({
          content,
          creatorId: schedule.creatorId
        })
        this.logger.log(`${blue('NEW POST')} ${newPost.id}`)
      }
    } catch (err) {
      this.logger.log(`${red('ERROR')} ${err}`)
    }
  }
}
