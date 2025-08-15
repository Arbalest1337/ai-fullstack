import { z } from 'zod'

export const generateVideoSchema = z
  .object({
    prompt: z.string()
  })
  .required()

export type GenerateVideoDto = z.infer<typeof generateVideoSchema>
