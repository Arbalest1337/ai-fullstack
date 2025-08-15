import { Injectable } from '@nestjs/common'

import * as UserSql from './user.sql'
@Injectable()
export class UserService {
  async getUserById(id) {
    const user = await UserSql.getUserById(id)
    return user
  }
}
