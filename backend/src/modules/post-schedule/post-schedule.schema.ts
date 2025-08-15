import { z } from 'zod'

export const createPostScheduleSchema = z.object({
  keywords: z.string(),
  enable: z.boolean().optional()
})
export type CreatePostScheduleDto = z.infer<typeof createPostScheduleSchema>

export const getSimilarityPostSchema = z.object({
  id: z.string()
})
export type GetSimilarityPostDto = z.infer<typeof getSimilarityPostSchema>
