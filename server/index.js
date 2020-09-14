const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../database/index.js');

var app = express();
app.use( bodyParser.json() );

//root directory declaration
app.use(express.static(__dirname + '/../client/public'));


//start listener
app.listen(3000, function() {
  console.log('listening on port 3000!');
});

//test DB queries
// db.getData((result) => {
//   if(result === 'ERROR') {
//     console.log("Error retrieving data.");
//   } else {
//     console.log("Data sucessfully loaded!");
//     db.updateDate((success) => {
//       console.log(success);
//     });
//   }
// });