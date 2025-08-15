import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guard/auth.guard'

export const Auth = () => applyDecorators(UseGuards(AuthGuard))

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
