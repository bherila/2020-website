import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
import AWS from 'aws-sdk'
import { PutObjectOutput } from 'aws-sdk/clients/s3'
require('dotenv').config()

const TwilioHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      res.statusCode = 200
      if (req.query.action === 'sent') {
        // Let's manually build some TwiML. We can choose to receive the
        // fax with <Receive>, or reject with <Reject>.
        const twiml = `<Response><Receive action="/api/twilio?action=recv"/></Response>`

        // Send Fax twiml response
        res.setHeader('Content-type', 'text/xml')
        return res.send(twiml)
      } else if (req.query.action === 'recv') {
        // notify us via sms!!
        const [twilioSid, twilioSecret] = process.env.TWILIO.toString().split(
          '.'
        )
        const api = twilio(twilioSid, twilioSecret)
        const sms = api.messages.create({
          body: 'Fax @ ' + req.body.MediaUrl,
          from: '+14158622534',
          to: '+1' + 2 * 4544415689,
        })

        // download fax from Twilio
        const faxFileArray = await fetch(req.body.MediaUrl)

        // upload to s3
        const [awsKeyId, awsSecret] = process.env.TWILIO.toString().split('.')
        const s3 = new AWS.S3({
          endpoint: 'sfo2.digitaloceanspaces.com',
          accessKeyId: awsKeyId,
          secretAccessKey: awsSecret,
        })
        const params = {
          Body: await faxFileArray.arrayBuffer(),
          Bucket: 'bwh',
          Key: `fax${req.body.FaxSid}.pdf`,
        }
        const uploadResult = new Promise<PutObjectOutput>((resolve, reject) => {
          s3.putObject(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
          })
        })

        return res.json({
          sid: (await sms).sid,
          result: (await uploadResult).ETag,
        })
      }
      return res.json({})
    } else if (req.method === 'GET') {
      res.statusCode = 200
      const [twilioSid, twilioSecret] = process.env.TWILIO.toString().split('.')
      const api = twilio(twilioSid, twilioSecret)
      const faxes = await api.fax.faxes.list({})
      return res.json(faxes)
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
}

export default TwilioHandler
