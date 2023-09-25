import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { sessionOptions } from '@/lib/session'

import type { User } from './user'

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req?.method == null) {
    res.status(400)
    return
  }
  const { username } = await req.body

  try {
    const login = '';
    const avatar_url= '';
    const user = { isLoggedIn: true, login, avatarUrl: avatar_url } as User
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
