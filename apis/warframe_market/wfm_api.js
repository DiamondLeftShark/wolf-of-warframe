//file for handling API calls to Warframe Market
//NOTE: WFM has a requested a limit of 3 API calls/second
const axios = require('axios');
var bodyParser = require('body-parser');

//root URL for API requests
const wfmUrl = 'https://api.warframe.market/v1/';

//retrieves basic info on the items listed in WFM and returns it to the requestor.
//This should be called first when requesting basic item info.
var getItems = function(callback) {
  let url = wfmUrl.concat('items');

  axios.get(url)
  .then(function(response) {
    //TBD: send data back to requestor
    callback(response.data);
  })
  .catch(function(error) {
    //TBD: error handlling
    console.log(error);
  })
}

module.exports.getItems = getItems;