const { Scenes } = require('telegraf')

const Scene = Scenes.BaseScene

const { requestLocation, menuKeyboard } = require('./keyboards')
const { formatTime } = require('./utils')
const { getCurrentWeather } = require('./weatherCommands')

class WeatherScenes {

    GenLocationScene () {

        const location = new Scene('location')

        location.enter(ctx => {
            ctx.reply("Give me ur location", requestLocation)
        })

        location.on('location', ctx => {

            ctx.session.location = ctx.message.location

            ctx.scene.leave()

            ctx.reply('Your location was set', menuKeyboard)

        })

        location.on('message', ctx => ctx.reply('I need your location'))

        return location

    }

    GenChangeTimeScene () {
        const newTime = new Scene('changeTime')

        newTime.enter(ctx => ctx.reply('Enter new time<i>(format: 10:00)</i>', { parse_mode: 'HTML' }))

        newTime.on('text', ctx => {

            try {
                const time = formatTime(ctx.message.text)
    
                ctx.session.time = time

                ctx.reply('Time was set')

                ctx.scene.leave()

            } catch (err) {
                ctx.reply(err.message)

                ctx.scene.reenter()
            }

        })

        newTime.on('message', ctx => ctx.reply('I need a time'))

        return newTime

    }

    GenStartTrackingScene () {

        const time = new Scene('time')

        time.enter(ctx => ctx.reply('Enter a time you want to get weather<i>(format: 10:00)</i>', { parse_mode: 'HTML' }))

        time.on('text', ctx => {

            try {

                const time = formatTime(ctx.message.text)

                ctx.session.time = time
    
                setInterval(() => {
            
                    var date = new Date()
            
                    if ( `${date.getHours()}:${date.getMinutes()}` == ctx.session.time ) {
            
                        getCurrentWeather(ctx)
            
                    }
            
                }, 60000)

                ctx.reply("You've started the <b>Weather Tracking</b>", {
                    parse_mode: 'HTML'
                })

                ctx.db.weatherTracking = true

                ctx.scene.leave()

            } catch (err) {
                ctx.reply(err.message)

                setTimeout(() => ctx.scene.reenter(), 500)
            }

        })

        time.on('message', ctx => ctx.reply('I need a time'))

        return time

    }

}

module.exports = {
    WeatherScenes
}