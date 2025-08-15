import { z } from 'zod'

export const createPostSchema = z
  .object({
    content: z.string()
  })
  .required()

export type CreatePostDto = z.infer<typeof createPostSchema>
