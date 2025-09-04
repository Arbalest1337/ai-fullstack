import { z } from 'zod'

export const generateSongSchema = z
  .object({
    prompt: z.string(),
    lyrics: z.string()
  })
  .required()

export type GenerateSongDto = z.infer<typeof generateSongSchema>
