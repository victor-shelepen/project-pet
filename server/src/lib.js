import { createHash } from 'crypto';

export function generateHash(string) {
  return createHash('md5')
    .update(string)
    .digest('hex')
}