const { pool } = require("./db")

function startLessonsTracking(ctx, next) {

    if ( !ctx.db.working ) {

        ctx.db.working = true

        setInterval(() => {

            var date = new Date()

            var day = date.getDay()

            console.log(day)

            const lessons = pool.query(`SELECT * FROM lessons WHERE day=${day};`).then(res => {
                res = res.rows

                if (res) {
                
                    var time = `${date.getHours()}:${date.getMinutes()}`
        
                    for (lesson of res) {
                
                        if ( time == lesson['time'] ) {
                
                            var subject = lesson['lesson']
                
                            ctx.reply(`Your subject is ${subject}`)

                            break
                        }
                    }
                }
            })

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