function startLessonsTracking(ctx, next) {

    if ( !ctx.db.working ) {

        ctx.db.working = true

        setInterval(() => {

            const lessons = require('../lessons.json')

            var date = new Date()

            var day = Number(date.getDay())

            if ( Object.keys(lessons).includes(String(day)) ) {
                
                var time = `${date.getHours()}:${date.getMinutes()}`

                var timecodes = Object.keys(lessons[`${day}`])
        
                if ( timecodes.includes(time) ) {
        
                    var subject = lessons[`${day}`][time]
        
                    ctx.reply(`Your subject is ${subject}`)
                }

            }

        }, 60000)

        ctx.reply("You've started the <b>Lessons Tracking</b>", {
            parse_mode: 'HTML'
        })

    } else {
        ctx.reply("<b>Lessons Tracking</b> is already working", {
            parse_mode: 'HTML'
        })
    }

}

module.exports = {
    startLessonsTracking
}