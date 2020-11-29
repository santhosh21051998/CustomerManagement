/*
Authored By : @Santhoshkumar S
Contact : santhosh21051998@gmail.com
*/

'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'praveen',
  port : '3306'
});
dbConn.connect(function(err) {
  if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;

