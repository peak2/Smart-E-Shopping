const Sequelize = require('sequelize');

const sequelize = new Sequelize('e_smart_shopping', 'root', '@Talent2010', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize





// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'e_smart_shopping',
//     password: '@Talent2010'
// })

// module.exports = pool.promise();