  
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const phabricatorCtrl=require('./phabricator-api');

// Created instance of TelegramBot
const bot = new TelegramBot(token, {
    polling: true
});

// In-memory storage

// Listener (handler) for telegram's /fileatask event
bot.onText(/\/fileatask/, (msg, match) => {

    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const messageString=match.input;
    const chatId = msg.chat.id;
    var taskName = messageString.substr(messageString.indexOf(' ')+1);//match.input.split(' ')[1];
    var senderUsername = msg.from.username; //default assignee is sender

   
    if (!taskName || taskName.indexOf(' ')<0){
        bot.sendMessage(
            chatId,
            'Please provide task name',
            );
        return;
    }

    var reqParams={
      title:taskName,
      assigneeUsername:senderUsername,
      senderUsername:senderUsername
    }

   //check if @username given
   const username = taskName.split('@')[1];   
   if(username){
       reqParams.assigneeUsername = username;
       reqParams.taskName=taskName.split('@')[0];  
   }

   //call create task api
   phabricatorCtrl.creatTask(reqParams,function(error,message){
       if(error){
           bot.sendMessage(
               chatId,
               'Error occured : '+message.error_code
               );
           return;
       }

       bot.sendMessage(
           chatId,
           message.message,
           {parse_mode: 'HTML'}
           );
       return;
   });


});

// Listener (handler) for telegram's /mytasks event
bot.onText(/\/mytasks/, (msg, match) => {
    const chatId = msg.chat.id;
    const senderUsername = msg.from.username; //default assignee is sender

   //call list task api
   phabricatorCtrl.myTasks({username:senderUsername},function(error,message){
       if(error){
           bot.sendMessage(
               chatId,
               'Error occured : '+message.error_code
               );
           return;
       }

       bot.sendMessage(
           chatId,
           message.message,
           {parse_mode: 'HTML'}
           );
       return;
   });

})