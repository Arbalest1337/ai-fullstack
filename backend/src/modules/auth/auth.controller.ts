import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { signUpSchema, SignUpDto, signInSchema, SignInDto } from './auth.schema'
import { ZodBody } from 'src/decorators/zod-body.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@ZodBody(signInSchema) body: SignInDto) {
    const res = await this.authService.signIn(body)
    return res
  }

  @Post('sign-up')
  async signUp(@ZodBody(signUpSchema) body: SignUpDto) {
    const res = await this.authService.signUp(body)
    return res
  }
}
