import { PipeTransform, ArgumentMetadata } from '@nestjs/common'
import { ZodType } from 'zod'

export class ZodPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (err) {
      const { path, message } = err.issues[0]
      const msg = `[${path[0]}] ${message}`
      throw new Error(msg)
    }
  }
}
