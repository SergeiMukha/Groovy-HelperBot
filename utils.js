function formatTime(time) {

    var time = time.split(':')

    var hour = Number(time[0])
    var minute = Number(time[1])

    if (isNaN(hour) || isNaN(minute)) {
        throw Error("Format isn't correct")
    }

    return `${hour}:${minute}`

}

module.exports = {
    formatTime
}