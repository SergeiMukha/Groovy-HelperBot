const { getCurrentWeatherData, getForecastWeatherData, getTomorrowAverageTemperature, getTomorrowTemperature } = require('./weatherApi')

function setWeatherInterval(ctx) {

    if (!ctx.session.location) {

        ctx.reply('First you have to set location\nPress "Set Location" button to do it')

    } else {

        if (!ctx.db.weatherTracking) {

            ctx.scene.enter('time')

        } else {

            ctx.reply("<b>Weather Tracking</b> is already working", {
                parse_mode: 'HTML'
            })

        }

    }

} 

function getCurrentWeather(ctx) {

    if (!ctx.session.location) {

        ctx.reply('First you have to set location\nPress "Set Location" button to do it')

    } else {

        const weather = getCurrentWeatherData(ctx.session.location['latitude'], ctx.session.location['longitude'])
    
        weather.then(data => {
            ctx.reply(`Temperature is ${Math.round(parseFloat(data['data']['main']['temp']) - 273.15)}C`)
        }).catch(err => ctx.reply('Error'))

    }

}

function getTomorrowWeatherForecast(ctx) {

    if (!ctx.session.location) {

        ctx.reply('First you have to set location\nPress "Set Location" button to do it')

    } else {

        const weather = getForecastWeatherData(ctx.session.location['latitude'], ctx.session.location['longitude'])

        weather.then(data => ctx.reply(`Avarege temperature tomorrow is ${getTomorrowAverageTemperature(data['data'])}C`))

    }


}

function getWeatherForecastForTimes(ctx) {

    if (!ctx.session.location) {

        ctx.reply('First you have to set location\nPress "Set Location" button to do it')

    } else {

        const weather = getForecastWeatherData(ctx.session.location['latitude'], ctx.session.location['longitude'])

        weather.then(data => {
            const temperatures = getTomorrowTemperature(data['data'])

            for (var i = 0; i < temperatures.length; i++) {

                time = `${(i+1)*3}:00`

                ctx.reply(`At ${time} temperature is ${temperatures[i]}C`)

            }
        })

    }

}

module.exports = {
    getCurrentWeather,
    getTomorrowWeatherForecast,
    setWeatherInterval,
    getWeatherForecastForTimes
}