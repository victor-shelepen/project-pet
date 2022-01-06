import { createContext } from 'react'
import { EventEmitter } from 'events'

export const RECAPTCHA_SITE_KEY = '6LdbrPQdAAAAAGikk-qc8ohTtPAfZfgFiXHSeNh3'

export const libEM = new EventEmitter()

export const LibEMContext = createContext(libEM)

export const TOKEN_KEY = 'token'
export const TOKEN_CHANGED_EVENT = 'tokenChanged'

let token = localStorage.getItem(TOKEN_KEY);
libEM.emit(TOKEN_CHANGED_EVENT, token)

export function isAuthenticated() {
  return !!token
}

export function setToken(_token) {
  token = _token
  localStorage.setItem(TOKEN_KEY, _token);
  libEM.emit(TOKEN_CHANGED_EVENT, _token)
}

export function removeToken() {
  token = undefined
  localStorage.removeItem(TOKEN_KEY)
  libEM.emit(TOKEN_CHANGED_EVENT, false)
}

function getFetchOptions() {
  return {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `token ${token}`})
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  }
}

export async function post(url, data) {
  const response = await fetch(url, {
    ...getFetchOptions(),
    method: 'POST',
    body: JSON.stringify(data)
  })
  const responseData = await response.json();

  return responseData
}

export async function get(url) {
  const response = await fetch(url, {
    ...getFetchOptions(),
    method: 'GET',
  })
  const responseData = await response.json();

  return responseData
}

function anonymousPostRoute(url, callback) {
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

