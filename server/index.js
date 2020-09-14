const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database/index.js');

//testing
db.getData((result) => {
  if(result === 'ERROR') {
    console.log("Error retrieving data.");
  } else {
    console.log("Data sucessfully loaded!");
    db.updateDate((success) => {
      console.log(success);
    });
  }
});