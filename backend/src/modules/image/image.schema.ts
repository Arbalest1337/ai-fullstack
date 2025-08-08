import { z } from 'zod'

export const generateImageSchema = z
  .object({
    prompt: z.string()
  })
  .required()

export type GenerateImageDto = z.infer<typeof generateImageSchema>
