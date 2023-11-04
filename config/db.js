const mysql2 = require('mysql2');

const con = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test-login'
})

module.exports = con;