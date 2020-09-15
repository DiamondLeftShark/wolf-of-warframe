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

//TBD: update page and offset with values from request header
//get ducat data from local database.
//Function expects a page and limit in the header: assumes 0 and 50 respectively if not provided.
app.get('/ducats', function(req, res) {
  console.log(req);
  let page = req.query.page;
  let limit = req.query.limit;
  console.log(page);
  console.log(limit);
  db.getDucatList(page, limit, (result) => {
    if(result === null) {
      res.status(500).end();
    } else {
      res.send(result);
    }
  });
});

//TBD: update page and offset with values from request header
//get hot item data from locatl database.
//function expects a page and limit in the header, assumes 0 and 50 respectively if not provided.
app.get('/hotitems', function(req, res) {
  let page = 0;
  let limit = 50;
  db.getHotItemList(page, limit, (result) => {
    if(result === null) {
      res.status(500).end();
    } else {
      res.send(result);
    }
  });
});

app.get('/inventory', function(req, res){
  db.getInventoryList((result) => {
    if(result === null) {
      res.status(500).end();
    } else {
      res.send(result);
    }
  });
});

app.patch('/inventory', function(req,res) {
  console.log(req.body);
  let params = req.body;
  db.updateInventory(params.id,params.quantity, (result) => {
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