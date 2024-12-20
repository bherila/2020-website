﻿import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server'
import path from 'path'
import { LicenseKeyResolver } from '@/app/api/graphql/LicenseKeyResolver'
import { buildSchemaSync } from 'type-graphql'
import { TimeseriesDocumentResolver, TimeseriesUserResolver } from '@/app/api/graphql/TimeseriesGraphql'
import { getSession } from '@/server_lib/session'
import ViewerContext from './ViewerContext'
import ViewerRootResolver from './ViewerRootResolver'
import { RootLabResultResolver, ViewerLabResultResolver } from './LabResultResolver'

const rootPath = process.cwd()

const schema = buildSchemaSync({
  resolvers: [
    LicenseKeyResolver,
    RootLabResultResolver,
    TimeseriesDocumentResolver,
    TimeseriesUserResolver,
    ViewerLabResultResolver,
    ViewerRootResolver,
  ],
  emitSchemaFile: {
    path: path.resolve(rootPath, 'schema.gql'),
    sortedSchema: false,
  },
})

const server = new ApolloServer({
  schema,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req): Promise<ViewerContext> => {
    const uid = (await getSession())?.uid || 0
    return {
      req,
      uid,
    }
  },
})

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
