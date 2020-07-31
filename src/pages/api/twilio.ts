import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
require('dotenv').config()

const TwilioHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      res.statusCode = 200
      return res.json({})
    } else if (req.method === 'GET') {
      res.statusCode = 200
      const [twilioSid, twilioSecret] = process.env.TWILIO.toString().split('.')
      const api = twilio(twilioSid, twilioSecret)
      const faxes = await api.fax.faxes('').fetch()
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
