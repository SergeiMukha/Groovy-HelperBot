require('dotenv').config()

const Telegraf = require('telegraf').Telegraf;
const { setUpBot } = require('./bot');

const { URL, PORT, BOT_TOKEN } = process.env

var bot = new Telegraf('5678401522:AAHXk2gGaq8be5ryoBWV5LdwAZFuOHLcq6g');
const lessons = require('./lessons.json');

(async function () {

    bot = setUpBot()

    bot.telegram.setWebhook(`${URL}/${BOT_TOKEN}`)
    bot.startWebhook(BOT_TOKEN, null, PORT)

}())