import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from 'src/decorators/currentUser.decorator'
import { Auth } from 'src/decorators/auth.decorator'

@Auth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async getUser(@CurrentUser() user) {
    const res = await this.userService.getUserById(user.id)
    return res
  }
}
