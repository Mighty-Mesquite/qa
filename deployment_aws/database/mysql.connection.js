var mysql      = require('mysql2');
var connection = mysql.createPool({
  host     : 'ec2-18-144-80-205.us-west-1.compute.amazonaws.com',
  user     : 'root',
  port     :  3306,
  database : 'questions',
  waitForConnection: true,
  connectionLimit: 2000,
  queueLimit: 0
});

module.exports = {
  connection
}