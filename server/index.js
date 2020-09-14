const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../database/index.js');

var app = express();
app.use( bodyParser.json() );

//root directory declaration
app.use(express.static(__dirname + '/../client/public'));

//paths

app.get('/lastupdate', function(req, res) {
  db.getUpdateDate((result) => {
    if(result === null) {
      res.status(500).end();
    } else {
      console.log(result[0].last_updated);
      res.send(result[0].last_updated);
    }
  })
});

//get latest data from WFM API and load into database
//TBD: more graceful error handling
app.get('/latest', function(req, res) {
  db.getData((result) => {
    if(result === 'ERROR') {
      console.log("Error retrieving data.");
      res.status(500).end();
    } else {
      console.log("Data sucessfully loaded!");
      db.updateDate((success) => {
        console.log(success);
      });
      res.status(200).end();
    }
  });
});


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