import { z } from 'zod'

const username = () =>
  z
    .string()
    .min(4, { message: '用户名最少8个字符' })
    .max(16, { message: '用户名最多16个字符' })
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, {
      message: '用户名必须以字母开头，且只能包含字母、数字和下划线'
    })

const password = () =>
  z
    .string()
    .min(8, { message: '密码最少需要8个字符' })
    .max(16, { message: '密码最多只能有16个字符' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message: '密码必须包含：一个小写字母，一个大写字母，一个数字，以及一个特殊字符 (!@#$%^&*)'
    })

export const signUpSchema = z.object({
  nickname: z.string().min(2, '昵称最少2个字符').max(12, '昵称最多8个字符'),
  username: username(),
  password: password()
})
export type SignUpDto = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  username: username(),
  password: password()
})
export type SignInDto = z.infer<typeof signInSchema>
