import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guard/auth.guard'
import { RolesGuard } from 'src/guard/role.guard'

export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard)
    // swagger
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' })
  )
}
