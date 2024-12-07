import db from '@/server_lib/db'
import { Resolver, Query, Ctx, FieldResolver, Root } from 'type-graphql'
import ViewerType from './Viewer'
import type ViewerContext from './ViewerContext'

@Resolver(ViewerType)
export default class ViewerRootResolver {
  @Query((returns) => ViewerType, {
    name: 'viewer',
  })
  
  resolveViewerRoot(@Ctx() vc: ViewerContext): ViewerType {
    return new ViewerType(vc.uid.toString())
  }

  @FieldResolver(() => String, { name: 'email', nullable: true })
  async email(@Root() ofUser: ViewerType) {
    try {
      const res: any = await db.query('select email from users where uid = ?', [ofUser.uid])
      if (res?.length == 1) {
        return res[0].email
      } else {
        return null
      }
    } finally {
      await db.end()
    }
  }
}
