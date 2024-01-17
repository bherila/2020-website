import { BaseContext } from '@apollo/server'
import { NextRequest } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'

export type HandlerRequest = NextApiRequest | NextRequest | Request
export interface ViewerContext extends BaseContext {
  uid: number
  req: HandlerRequest
}
