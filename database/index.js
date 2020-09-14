const mysql = require('mysql');
const mysqlConfig = require('./db_connection.js');
const db = mysql.createConnection(mysqlConfig);

const wfm = require('../apis/warframe_market/wfm_api.js');


//connect to WFM and populate database with latest data
var loadData = function(callback) {
  console.log("Downloading item data from Warframe Market...");
  wfm.getItems((itemData) => {
    console.log("Data received!");
    console.log(itemData);
  })
}

module.exports.loadData = loadData;