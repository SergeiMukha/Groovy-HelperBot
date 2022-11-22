const axios = require("axios");

function getCurrentWeatherData(lat, lon) {

    const options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {lat: lat, lon: lon, appid: 'a37cac12855ebce8f0ee23ced3e36c63', lang: 'ua'},
    };

    const result = axios.request(options)

    return result

}

function getForecastWeatherData(lat, lon) {

    const options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        params: {lat: lat, lon: lon, appid: 'a37cac12855ebce8f0ee23ced3e36c63', lang: 'ua'},
    };

    const result = axios.request(options)

    return result


}

function getTomorrowAverageTemperature(data) {

    var date = new Date()
    date.setDate(date.getDate() + 1);

    var options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    
    var forecastDate = date.toLocaleString("tr-Tr", options);

    var necessaryObjects = data['list'].filter(item => { return item.dt_txt.split(' ')[0].split('-').reverse().join('.') == forecastDate })

    var temperature = 0

    necessaryObjects.forEach(item => {
        var temp = item.main.temp - 273.15

        temperature += temp
    })

    return Math.round(temperature / necessaryObjects.length)

}

function getTomorrowTemperature(data) {

    var date = new Date()
    date.setDate(date.getDate() + 1);

    var options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    var forecastDate = date.toLocaleString("tr-Tr", options);

    var necessaryObjects = data['list'].filter(item => { return item.dt_txt.split(' ')[0].split('-').reverse().join('.') == forecastDate })

    var result = necessaryObjects.map(item => { return Math.round(item.main.temp - 273.15) })

    return result

}

module.exports = {
    getCurrentWeatherData,
    getForecastWeatherData,
    getTomorrowAverageTemperature,
    getTomorrowTemperature
}