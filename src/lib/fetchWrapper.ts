import { userService } from 'lib/user.service'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
}

function get(url: string) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(url),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function post(url: string, body) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    credentials: 'include',
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function put(url: string, body) {
  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: authHeader(url),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

// helper functions

function authHeader(url): any {
  // return auth header with basic auth credentials if user is logged in and request is to the api url
  const user = userService.userValue
  const isLoggedIn = user && user.authdata
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Basic ${user.authdata}` }
  } else {
    return {}
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      if ([401, 403].includes(response.status) && userService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        userService.logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
