import { z } from 'zod'

export const textToVideoSchema = z
  .object({
    prompt: z.string()
  })
  .required()

export type TextToVideoDto = z.infer<typeof textToVideoSchema>

export const imageToVideoSchema = z
  .object({
    prompt: z.string().optional(),
    imgUrl: z.string()
  })
  .required()

export type ImageToVideoDto = z.infer<typeof imageToVideoSchema>
