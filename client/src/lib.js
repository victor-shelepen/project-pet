import { createContext } from 'react'
import { EventEmitter } from 'events'

export const libEM = new EventEmitter()

export const LibEMContext = createContext(libEM)

export const TOKEN_KEY = 'token'
export const TOKEN_CHANGED_EVENT = 'tokenChanged'

let token = localStorage.getItem(TOKEN_KEY);

export function isAuthenticated() {
  return !!token
}

export function setToken(_token) {
  token = _token
  localStorage.setItem(TOKEN_KEY, _token);
  libEM.emit(TOKEN_CHANGED_EVENT, _token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
  libEM.emit(TOKEN_CHANGED_EVENT, false)
}

export async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `token ${token}`})
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  const responseData = await response.json();

  return responseData
}
