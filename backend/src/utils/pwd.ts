import { scrypt, randomBytes, timingSafeEqual } from 'crypto'
import { promisify } from 'util'
const scryptASync = promisify(scrypt)

const SPLIT_SYMBOL = '$'

export const getHashedPwd = async (pwd: string) => {
  const salt = randomBytes(16).toString('hex')
  const hashedPwd = ((await scryptASync(pwd, salt, 64)) as Buffer).toString('hex')
  return `${salt}${SPLIT_SYMBOL}${hashedPwd}`
}

export const verifyPwd = async (pwd: string, hashed: string) => {
  const [salt, hashedPwd] = hashed.split(SPLIT_SYMBOL)
  if (!salt || !hashedPwd) return false
  const hashedBuffer = (await scryptASync(pwd, salt, 64)) as Buffer
  const match = timingSafeEqual(hashedBuffer, Buffer.from(hashedPwd, 'hex'))
  return match
}
