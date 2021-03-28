// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import TelegramBot from 'node-telegram-bot-api'

import * as phabricatorCtrl from '../../phabricator'

const config = {
  token: process.env.TOKEN,
}

const staticBot = (async () => {
  const bot = new TelegramBot(config.token)
  await bot.setWebHook('')

  // Listener (handler) for telegram's /fileatask event
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the message text
  bot.onText(/\/fileatask/, (msg, match) => {
    const messageString = match.input
    const chatId = msg.chat.id
    const taskName = messageString.substr(messageString.indexOf(' ') + 1) //match.input.split(' ')[1];
    const senderUsername = msg.from.username //default assignee is sender
    if (!taskName) {
      bot.sendMessage(chatId, 'Please provide task name')
      return
    }

    const username = taskName.split('@')[1]
    const reqParams = {
      title: taskName,
      assigneeUsername: username || senderUsername, // assign to username, if given.
      senderUsername: senderUsername,
      taskName: taskName?.split('@')[0],
    }

    //call create task api
    phabricatorCtrl
      .createTask(reqParams)
      .then(({ error_code, message }) => {
        if (error_code) {
          bot.sendMessage(chatId, 'Error occurred: ' + error_code)
        } else {
          bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
        }
      })
      .catch((err) => {
        bot.sendMessage(chatId, 'Error' + err?.toString())
      })
  })

  // Listener (handler) for telegram's /mytasks event
  bot.onText(/\/mytasks/, (msg, match) => {
    const chatId = msg.chat.id
    const senderUsername = msg.from.username //default assignee is sender
    //call list task api
    phabricatorCtrl
      .myTasks({ username: senderUsername })
      .then(({ error_code, message }) => {
        if (error_code) {
          bot.sendMessage(chatId, 'Error occurred: ' + error_code)
        }
        bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
      })
  })

  return bot
})()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const aliveBot = await staticBot
  aliveBot.processUpdate(req.body)
  res.status(200)
}

export default handler
