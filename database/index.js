const mysql = require('mysql');
const mysqlConfig = require('./db_connection.js');
const db = mysql.createConnection(mysqlConfig);

const wfm = require('../apis/warframe_market/wfm_api.js');


//connect to WFM and populate database with latest data
var loadData = function(callback) {
  console.log("Downloading item data from Warframe Market...");

  wfm.getItems((itemData) => {
    if(itemData === 'ERROR') {
      console.log("Error getting item data!");
    } else {
    console.log("Basic item data received!");
    console.log(itemData);

    console.log("Getting ducat information...");

    wfm.getDucats((ducatData) => {
      if(ducatData === 'ERROR') {
        console.log("Error getting ducat data!");
      } else {
        console.log("Ducat data received!");
        console.log(ducatData);
      }
    })
    }
  });
}

module.exports.loadData = loadData;