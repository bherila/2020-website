import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '@/lib/session'

export type User = {
  isLoggedIn: boolean
  login: string
  avatarUrl: string
}

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req?.method == null) {
    res.status(400)
    return
  }
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      login: '',
      avatarUrl: '',
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
// example from https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/pages/api/user.ts?ts=2
