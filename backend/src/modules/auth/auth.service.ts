import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verifyPwd, getHashedPwd } from 'src/utils/pwd'
import * as AuthSql from './auth.sql'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(params) {
    const { username, password } = params
    const res = await AuthSql.getUserPwdByUsername(username)
    if (!res) throw new Error(`Can not find user by username ${username}`)
    const { password: hashedPwd, userId } = res
    const isPwdCorrect = await verifyPwd(password, hashedPwd)
    if (!isPwdCorrect) {
      throw new Error('Incorrect username or password')
    }
    const payload = { sub: userId, id: userId }
    const accessToken = await this.jwtService.signAsync(payload)
    return { accessToken }
  }

  async signUp(params) {
    const { username, password, nickname } = params
    const existingUser = await AuthSql.getUserPwdByUsername(username)
    if (existingUser) throw new Error(`Username already exists`)
    const hashedPwd = await getHashedPwd(password)
    const res = await AuthSql.createUserWidthPassword({ username, password: hashedPwd, nickname })
    return res
  }
}
