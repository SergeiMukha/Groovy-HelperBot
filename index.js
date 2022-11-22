const Telegraf = require('telegraf').Telegraf;
const { setUpBot } = require('./bot');

var bot = new Telegraf('5678401522:AAHXk2gGaq8be5ryoBWV5LdwAZFuOHLcq6g');
const lessons = require('./lessons.json');

(async function () {

    await setUpBot().launch().catch(console.log)

}())