import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  if (key) {
    return request.user[key]
  }
  return request.user
})
