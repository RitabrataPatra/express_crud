const mysql2 = require('mysql2/promise')

const mySqlConnection = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'studentsdb'
})


module.exports= {mySqlConnection}