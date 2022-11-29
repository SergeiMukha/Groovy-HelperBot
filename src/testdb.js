const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    password: "santaclaus",
    host: "localhost",
    port: 5432,
    database: "groovy"
})

pool.query("INSERT INTO users(id, username) VALUES(12345, 'Antoha');").catch(err => console.error(err.message))
console.log(pool.query("SELECT * FROM users").then(res => console.log(res.rows)).catch(err => console.error(err)))