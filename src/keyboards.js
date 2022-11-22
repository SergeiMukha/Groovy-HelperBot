const { Keyboard, Key } = require('telegram-keyboard')

var requestLocation = Keyboard.make([
    Key.location('Send Me Location'),
]).reply()

var menuKeyboard = Keyboard.make([
    ['Start Lessons Tracker', 'Set Location',],
    ['Current Weather', 'Average Tomorrow Temperature',],
    ['Tomorrow Forecast', 'Start Weather Tracking',],
    ['Change Time',]
]).reply()

module.exports = {
    requestLocation,
    menuKeyboard
}