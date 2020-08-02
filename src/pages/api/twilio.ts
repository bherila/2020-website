import { NextApiRequest, NextApiResponse } from 'next'
import twilio, { Twilio } from 'twilio'
import AWS from 'aws-sdk'
import { PutObjectOutput } from 'aws-sdk/clients/s3'
import fetch from 'node-fetch'

require('dotenv').config()

const FAX_FROM = '+14158622534'

function getOutboundFilename() {
  return 'outbound' + new Date().getTime()
}

function getInboundFilename(sid) {
  return 'inbound' + new Date().getTime() + '_' + sid
}

function getTwilio() {
  const twilioEnv = process.env.TWILIO.toString()
  const [twilioSid, twilioSecret] = twilioEnv.split('.')
  return twilio(twilioSid, twilioSecret)
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200
  const [twilioSid, twilioSecret] = process.env.TWILIO.toString().split('.')
  const api = twilio(twilioSid, twilioSecret)
  return await api.fax.faxes.list({})
}

async function handleOutboundFax(req: NextApiRequest) {
  console.info('Outbound fax to ' + req.body.to)
  const uploadedFile = Buffer.from(req.body.file.split(',')[1], 'base64')
  const uploadResult = uploadFaxBlob(uploadedFile, getOutboundFilename())
  console.info('Uploaded to s3', await uploadResult)
  const fax = getTwilio().fax.faxes.create({
    from: FAX_FROM,
    mediaUrl: await uploadResult,
    quality: 'fine',
    storeMedia: false,
    to: req.body.to,
  })
  const result = {
    url: uploadResult,
    to: req.body.to,
    faxResult: (await fax).sid,
  }
  console.info('Sent fax', result)
  return result
}

async function handleReceivedFax(MediaUrl: string, FaxSid: string) {
  const api = getTwilio()
  const sms = sendSms(api, 'Fax @ ' + MediaUrl)
  const faxFetch = await fetch(MediaUrl)
  const uploadResult = uploadFaxBlob(await faxFetch.blob(), FaxSid)
  return {
    sid: (await sms).sid,
    result: await uploadResult,
  }
}

function sendXml(res: NextApiResponse, xml: any) {
  res.setHeader('Content-type', 'text/xml')
  return res.send(xml)
}

function sendSms(api: Twilio, body: string) {
  return api.messages.create({
    body,
    from: FAX_FROM,
    to: '+1' + 2 * 4544415689,
  })
}

// Uploads a fax to S3 and returns the signed URL.
async function uploadFaxBlob(
  faxFileBuffer: AWS.S3.Body,
  sid: string
): Promise<string> {
  try {
    const [awsKeyId, awsSecret] = process.env.AWSSID.toString().split('.')
    const s3 = new AWS.S3({
      endpoint: 'sfo2.digitaloceanspaces.com',
      accessKeyId: awsKeyId,
      secretAccessKey: awsSecret,
    })
    const params: AWS.S3.Types.PutObjectRequest = {
      Body: faxFileBuffer,
      Bucket: 'bwh',
      Key: `${getInboundFilename(sid)}.pdf`,
    }
    const uploadJob = new Promise<PutObjectOutput>((resolve, reject) => {
      s3.putObject(params, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
    console.info('Uploaded item with ETag ' + (await uploadJob).ETag)
    return s3.getSignedUrlPromise('getObject', {
      Bucket: params.Bucket,
      Key: params.Key,
    })
  } catch (err) {
    console.error('Failed to upload fax blob to S3', err)
    return Promise.resolve('about:failed')
  }
}

const TwilioHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.statusCode = 200
    if (req.method === 'POST') {
      res.statusCode = 200
      if (req.query.action === 'sent') {
        const response = `<Response><Receive action="/api/twilio?action=recv"/></Response>`
        return sendXml(res, response)
      } else if (req.query.action === 'recv') {
        return res.json(
          await handleReceivedFax(req.body.MediaUrl, req.body.FaxSid)
        )
      } else if (typeof req.body.to === 'string') {
        if (process.env.PW !== req.body.pw) {
          res.statusCode = 403
          return res.json({ result: 'Wrong password' })
        }
        return res.json(await handleOutboundFax(req))
      }
    } else if (req.method === 'GET') {
      if (process.env.PW !== req.query.pw) {
        res.statusCode = 403
        return res.json({ result: 'Wrong password' })
      }
      return res.json(await handleGet(req, res))
    } else {
      res.statusCode = 400
      return res.json({ error: 'Wrong body type' })
    }
  } catch (err) {
    if (err.status) {
      res.statusCode = err.status
      return res.json({ error: (err as Error).message })
    } else {
      throw err
    }
  }

  res.statusCode = 400
  return res.json({ error: 'Not implemented' })
}

export default TwilioHandler
