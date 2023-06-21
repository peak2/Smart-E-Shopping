const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'e_smart_shopping',
    password: '@Talent2010'
})

module.exports = pool.promise();