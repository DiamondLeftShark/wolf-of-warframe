//file for handling API calls to Warframe Market

const axios = require('axios');
const rateLimit = require('axios-rate-limit');

//root URL for API requests
const wfmUrl = 'https://api.warframe.market/v1/';
//NOTE: WFM has a requested a limit of 3 API calls/second
const http = rateLimit(axios.create(), { maxRPS: 3 });

//retrieves basic info on the items listed in WFM and returns it to the requestor.
//This should be called first when requesting basic item info.
var getItems = function(callback) {
  let url = wfmUrl.concat('items');

  http.get(url)
  .then(function(response) {
    callback(response.data.payload.items);
  })
  .catch(function(error) {
    console.log(error);
    callback('ERROR');
  })
}

//get ducat information
var getDucats = function(callback) {
  let url = wfmUrl.concat('tools/ducats');

  http.get(url)
  .then(function(response) {
    callback(response.data.payload.previous_hour);
  })
  .catch(function(error) {
    console.log(error);
    callback('ERROR');
  });
}

module.exports.getItems = getItems;
module.exports.getDucats = getDucats;