/**
 * Ref: https://jasonwatmore.com/post/2021/08/29/next-js-basic-http-authentication-tutorial-with-example-app#user-service-js
 *
 * The user service handles communication from the React front-end
 * of the Next.js app to the backend API, it contains methods for
 * logging in and out of the app, and a method for fetching all
 * users from the API. HTTP requests are sent with the help of
 * the fetch wrapper.
 *
 * On successful login the API returns the user details, the
 * service then sets the basic auth credentials (user.authdata)
 * to the Base64 encoded username and password, the user object
 * is then published to all subscribers with the call to
 * userSubject.next(user), the user is stored in local storage to
 * stay logged between page refreshes and browser sessions.
 *
 * RxJS subjects and observables are used by the service to store
 * the current user state and communicate between different
 * components in the application. To learn more about using React
 * with RxJS check out React + RxJS - Communicating Between
 * Components with Observable & Subject.
 */
import Router from 'next/router'
import { BehaviorSubject } from 'rxjs'

import { fetchWrapper } from './fetchWrapper'

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem('user')),
)

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
  login,
  logout,
  getAll,
}

async function login(username: string, password: string): Promise<any> {
  const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
    username,
    password,
  })
  // publish user with basic auth credentials to subscribers and store in
  // local storage to stay logged in between page refreshes
  user.authdata = window.btoa(username + ':' + password)
  userSubject.next(user)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

/**
 * Remove user from local storage, publish null to user subscribers
 * and redirect to login page
 */
function logout(): Promise<boolean> {
  localStorage.removeItem('user')
  userSubject.next(null)
  return Router.push('/login')
}

function getAll() {
  return fetchWrapper.get(baseUrl)
}
