import { z } from 'zod'

export const generateImageSchema = z.object({
  prompt: z.string()
})

export type GenerateImageDto = z.infer<typeof generateImageSchema>
