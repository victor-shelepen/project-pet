import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'

export function generateHash(string) {
  return createHash('md5')
    .update(string)
    .digest('hex')
}

export function encodeToken(userId) {
  const token = jwt.sign({ userId }, process.env.SECRET)

  return token
}

export function decodeToken(string) {
  const data = jwt.verify(string, process.env.SECRET)

  return data
}
