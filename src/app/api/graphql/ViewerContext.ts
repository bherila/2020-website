import { BaseContext } from '@apollo/server'
import { NextRequest } from 'next/server'

type HandlerRequest = NextRequest | Request

export default interface ViewerContext extends BaseContext {
  uid: number
  req: HandlerRequest
}
