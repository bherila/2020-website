import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
})

export default authClient
