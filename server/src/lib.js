import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'
import * as fetch from 'node-fetch';

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

export function authRoute(xprs, type, url, callback) {
  xprs[type](url, async (req, res) => {
    if (!req.user) {
      req.alerts.push({
        severity: 'error',
        message: 'The user should be authenticated.',
      })
      res
        .status(401)
        .back()
      return
    }
    await callback(req, res)
  })
}

export function anonymousPostRoute(xprs, url, callback) {
  xprs.post(url, async (req, res) => {
    const { recaptcha, secret } = req.body

    if (secret && secret == process.env.secret) {
      // Ok. Pass futher.
    }
    else {
      const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
      })
      const { success } = await response.json()
      if (!success) {
        req.alerts.push({
          severity: 'error',
          message: 'Invalid verification code.',
        })
        res
          .status(401)
          .back()

        return
      }

      delete req.body.recaptcha
    }

    await callback(req, res)
  })
}
