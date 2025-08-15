import { Body } from '@nestjs/common'
import { ZodSchema } from 'zod'
import { ZodPipe } from 'src/pipe/zod.pipe'

export const ZodBody = (schema: ZodSchema<any>) => {
  return Body(new ZodPipe(schema))
}
