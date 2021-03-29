var mysql      = require('mysql2');
var connection = mysql.createPool({
  host     : 'localhost',
  // host     : 'database',
  user     : 'root',
  database : 'questions',
  waitForConnection: true,
  connectionLimit: 10,
  queueLimit: 0
});

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected to mysql!');
// });

module.exports = {
  connection
}