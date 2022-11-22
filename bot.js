require('dotenv').config()

const { Telegraf, Scenes: { Stage }, session } = require('telegraf')
const { startLessonsTracking } = require('./lessonsTracker')
const { getCurrentWeather, getTomorrowWeatherForecast, setWeatherInterval, getWeatherForecastForTimes } = require('./weatherCommands')
const { WeatherScenes } = require('./scenes')
const { menuKeyboard } = require('./keyboards')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.context.db = {}

const currentScene = new WeatherScenes
const locationScene = currentScene.GenLocationScene
const startWeatherTrackingScene = currentScene.GenStartTrackingScene
const changeTimeScene = currentScene.GenChangeTimeScene

const stage = new Stage([locationScene(), startWeatherTrackingScene(), changeTimeScene()])

const setUpBot = () => {
    
    bot.use(session())
    bot.use(stage.middleware())

    bot.start(ctx => {
        ctx.reply("Hi! I'm Groovy! Your helper bot :)", menuKeyboard)
    })

    // Set Lessons Tracker Command
    bot.hears('Start Lessons Tracker', startLessonsTracking)

    // Set hears Command
    bot.hears('Set Location', ctx => {
        ctx.scene.enter('location')
    })

    // Weather Commands
    bot.hears('Current Weather', getCurrentWeather)
    bot.hears('Average Tomorrow Temperature', getTomorrowWeatherForecast)
    bot.hears('Tomorrow Forecast', getWeatherForecastForTimes)
    bot.hears('Start Weather Tracking', setWeatherInterval)

    bot.hears('Change Time', ctx => ctx.scene.enter('changeTime'))
    
    bot.on('text', ctx => ctx.reply(ctx.message.text))
    
    return bot

}

module.exports = {
    setUpBot
}