require('dotenv').config();

const { setUpBot } = require('./bot');
const { pool } = require('./db')

const { URL, BOT_TOKEN } = process.env;
const PORT = process.env.PORT || 5000;

(async function () {

    console.log('Starting');

    bot = setUpBot(pool);

    if (process.env.NODE_ENV == "production") {
        bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
        bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
        console.log('Started with webhook');
    } else {
        bot.launch().then(() => console.log('Bot Was Started on Local Host'));
    };

}())