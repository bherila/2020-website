import * as azdev from 'azure-devops-node-api'
import { IncomingMessage } from 'http'
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from 'next'
import React from 'react'

/*
{
  "command": "What up?",
  "creator": {
    "id": 1007299143,
    "attachable_sgid": "BAh7CEkiCGdpZAY6BkVUSSIrZ2lkOi8vYmMzL1BlcnNvbQQcMDA3Mjk5MTQzP2V4cGlyZXNfaW4GOwBUSSIMcHVycG9zZQY7AFRJIg9hdHRhY2hhYmxlBjsAVEkiD2V4cGlyZXNfYXQGOwBUMA==--919d2c8b11ff403eefcab9db42dd26846d0c3102",
    "name": "Victor Cooper",
    "email_address": "victor@honchodesign.com",
    "personable_type": "User",
    "title": "Chief Strategist",
    "bio": "Don't let your dreams be dreams",
    "created_at": "2016-09-22T16:21:03.625-05:00",
    "updated_at": "2016-09-22T16:21:06.184-05:00",
    "admin": true,
    "owner": true,
    "time_zone": "America/Chicago",
    "avatar_url": "https://3.basecamp-static.com/195539477/people/BAhpBEcqCjw=--c632b967cec296b87363a697a67a87f9cc1e5b45/avatar-64-x4",
    "company": {
      "id": 1033447817,
      "name": "Honcho Design"
    }
  },
  "callback_url": "https://3.basecamp.com/195539477/integrations/2uH9aHLEVhhaXKPaqrj8yw8P/buckets/2085958501/chats/9007199254741775/lines"
}
*/
function streamToString(stream: IncomingMessage): Promise<string> {
  const chunks: any[] = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let responseData: any = null
  let renderTranspose = false
  const token = process.env.UC_VSTS_TOKEN
  if (typeof token !== 'string' || !token) {
    context.res.statusCode = 500
    responseData = 'Missing VSTS token'
  } else if (typeof context.query.key !== 'string') {
    context.res.statusCode = 401
    responseData = 'Missing API key'
  } else {
    // do stuff
    let handled = false
    try {
      const json = JSON.parse(await streamToString(context.req))
      responseData = json.command || '??'
      if (typeof responseData === 'string') {
        const tokenHandler = azdev.getPersonalAccessTokenHandler(token)
        const connection = new azdev.WebApi(
          'https://ucellar.visualstudio.com/',
          tokenHandler,
        )
        const parts = responseData.split(' ')
        if (!parts[0]) {
          responseData = 'Invalid command: ' + responseData
        } else if (
          parts[0] === 'completeTicket' &&
          !isNaN(parseInt(parts[1]))
        ) {
          const workItemApi = await connection.getWorkItemTrackingApi()
          const workItemId = parseInt(parts[1])
          const patchDocument = []
          const res = await workItemApi.updateWorkItem(
            null,
            patchDocument,
            workItemId,
          )
          responseData = 'Updated ' + res.url + ' 😎'
          handled = true
        } else if (parts[0] === 'getTicket') {
          const workItemId = parseInt(parts[1])
          const workItemApi = await connection.getWorkItemTrackingApi()
          const workItem = await workItemApi.getWorkItem(workItemId)
          responseData = workItem.fields
          handled = true
          renderTranspose = true
        }
      }
    } catch (err) {
      responseData = err.toString() + err.stack
      handled = true
    }
    if (!handled) context.res.statusCode = 400
  }
  context.res.setHeader('Cache-Control', 'no-cache')
  return {
    props: {
      responseData,
      renderTranspose,
    },
  }
}

export default function ChatBot({
  responseData,
  renderTranspose,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (Array.isArray(responseData) && responseData.length > 0) {
    const keys = Object.keys(responseData[0]).filter((x) => x !== '$type')
    return (
      <table>
        <thead>
          <tr>
            {keys.map((x, i) => (
              <th key={'h' + i}>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responseData.map((row, i) => (
            <tr key={'r' + i}>
              {keys.map((x, j) => (
                <td key={`r${i}.${j}`}>
                  {row[x].toString().replace('T00:00:00.0000000', '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  } else if (typeof responseData === 'string') {
    return <div>{responseData}</div>
  } else if (typeof responseData === 'object') {
    const keys = Object.keys(responseData)
    return (
      <table cellPadding={0} cellSpacing={0}>
        <tbody>
          {keys.map((key, i) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <pre>{JSON.stringify(responseData[key], null, '  ')}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return <div>Not implemented yet!</div>
}
