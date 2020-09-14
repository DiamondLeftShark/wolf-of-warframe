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

//populates user inventory with item IDs for further manipulation from user.  Since table tracks user items,
//should only insert records for items that do not currently exist.
function populateInventory(callback) {
  console.log("TBD");
}

/*------------------------------Public functions------------------------------------------*/

//Updates update_log with current datetime value
var updateDate = function(callback) {
  let date = new Date();
  db.query(`insert into update_log values('${date.toISOString().slice(0, 19).replace('T', ' ')}');`, function(error, result) {
    if(error) {
      console.log("Error inserting to update_log");
      console.log(error);
      callback(false);
    } else {
      console.log("Update_log table updated.");
      callback(true);
    }
  })
};

//gets most recent update date from database
var getUpdateDate = function(callback) {
  db.query(`select last_updated from update_log order by last_updated limit 1;`, function(error, result) {
    if(error) {
      console.log("Error retrieving latest update date.");
      console.log(error);
      callback(null);
    } else {
      callback(result);
    }
  });
};

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

//retrieve ducat information stored in the database.
var getDucatList = function(page=0, limit=10, callback) {
  //calculate offset from page * limit;
  let offset = page * limit;
  db.query(`select item_info.id, item_name, ducats, ducats_per_plat, thumb from item_info, ducat_info where item_info.id = ducat_info.item_id order by ducats_per_plat desc, item_name limit ${limit} offset ${offset};`, function(error, result) {
    if(error) {
      console.log("Error retrieving ducat data from local database.");
      callback(null);
    } else {
      console.log(`Ducat data for page ${page} with ${limit} records retrieved`);
      callback(result);
    }
  });
}

//retrieve hot items (highest trades by volume).  Currently uses volume data from ducat table.
var getHotItemList = function(page=0, limit=10, callback) {
  let offset = page * limit;
  db.query(`select item_info.id, item_name, volume, thumb from item_info, ducat_info where item_info.id = ducat_info.item_id order by volume desc, item_name limit ${limit} offset ${offset};`, function(error, result) {
    if(error) {
      console.log("Error retrieving hot item data from local database.");
      callback(null);
    } else {
      console.log(`Hot item data for page ${page} with ${limit} records retrieved`);
      callback(result);
    }
  });
}

module.exports.updateDate = updateDate;
module.exports.getUpdateDate = getUpdateDate;
module.exports.getData = getData;
module.exports.getDucatList = getDucatList;
module.exports.getHotItemList = getHotItemList;