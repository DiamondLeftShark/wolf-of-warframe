const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../database/index.js');

var app = express();
app.use( bodyParser.json() );

//root directory declaration
app.use(express.static(__dirname + '/../client/public'));

//paths

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


//get last update date for data in local database.
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

//get ducat data from local database.
//Function expects a page and limit in the header: assumes 0 and 100 respectively if not provided
app.get('/ducats', function(req, res) {
  //TBD: update page and offset with values from request header
  let page = 0;
  let limit = 50;
  db.getDucatList(page, limit, (result) => {
    if(result === null) {
      res.status(500).end();
    } else {
      res.send(result);
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