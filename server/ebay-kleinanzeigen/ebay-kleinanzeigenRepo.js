const scrapeIt = require('scrape-it');
const configuration = require('./basicConfig');


module.exports = {
  listOfItems: function (itemUrl) {
    //console.log(fetchConfig)
    return new Promise((resolve) =>{
      scrapeIt(itemUrl, configuration.getConfiguration()).then(items => {
        resolve(items);
      });
    });
  }
}


