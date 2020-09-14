//library declarations
const mysql = require('mysql');

//DB connection
const mysqlConfig = require('./db_connection.js');
const db = mysql.createConnection(mysqlConfig);

const wfm = require('../apis/warframe_market/wfm_api.js');

/*----------------------Private Helper Functions--------------------------------------*/

//truncates the item_info table and inserts the provided dataset.
function replaceItemInfo(dataSet, callback) {
  db.query(`truncate table item_info;`, function(error, result) {
    if(error) {
      console.log(`Error truncating table item_info`);
      console.log(error);
      callback(false);
    } else {
      for(let i = 0; i < dataSet.length; i++){
        let dataRecord = dataSet[i];
        db.query( `insert into item_info set ?`, dataRecord, function(error,result) {
          if(error) {
            console.log(`Error inserting data into item_info`);
            console.log(error);
            callback(false);
          }
        });
      }
      console.log(`${dataSet.length} item records inserted.`);
      callback(true);
    };
  });
}

//
function replaceDucatInfo(dataSet, callback) {
  db.query(`truncate table ducat_info`, function(error, result) {
    if(error) {
      console.log('Error truncating table ducat_info');
      console.log(error);
      callback(false);
    } else {
      for(let i = 0; i < dataSet.length; i++) {
        let dataRecord = {
          'item_id': dataSet[i].item,
          'ducats': dataSet[i].ducats,
          'volume': dataSet[i].volume,
          'ducats_per_plat': dataSet[i]['ducats_per_platinum']
        };
        db.query(`insert into ducat_info set ?`, dataRecord, function(error, result) {
          if(error) {
            console.log(`Error inserting data into ducat_info`);
            console.log(error);
            callback(false);
          }
        });
      }
      callback(true);
    }
  });
}

/*------------------------------Server calls------------------------------------------*/

//connect to WFM and populate database with latest data
var getData = function(callback) {
  console.log("Downloading item data from Warframe Market...");

  wfm.getItems((itemData) => {
    if(itemData === 'ERROR') {
      console.log("Error getting item data!");
    } else {
    console.log("Basic item data received!");
    console.log(`${itemData.length} records received.`);
    //console.log(itemData);
    replaceItemInfo(itemData, (success) => {
      if(!success) {
        callback('ERROR');
      }
    });

    console.log("Getting ducat information...");

    wfm.getDucats((ducatData) => {
      if(ducatData === 'ERROR') {
        console.log("Error getting ducat data!");
      } else {
        console.log("Ducat data received!");
        console.log(`${ducatData.length} records received.`);

        replaceDucatInfo(ducatData, (success) => {
          if(!success) {
            callback('ERROR');
          } else {
            callback('SUCCESS');
          }
        });

      }
    })
    }
  });
}

module.exports.getData = getData;