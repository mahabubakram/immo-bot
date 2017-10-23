'use strict';

const repo = require('./immpobilienscout24.repo');
const connectionManager = require('../../core/connection-manager/index');


module.exports = {
  getAllScrapeCtrl : function(scrapeUrl){
    let apartmentModel = connectionManager.getModel('apartmentModel');
    return repo.getAllScrape(scrapeUrl, apartmentModel);
  },

  /**
   * This function will return the unique scrape matched with the Database
   * @param scrapeUrl
   */
  getUniqueScrape : function(scrapeUrl){
    const allScrapeItems = this.getAllScrapeCtrl(scrapeUrl);
    return repo.getUniqueScrape(allScrapeItems);
  },

  /**
   * This function will at first resolve the uniqueScrape and then
   * call the repo Function to match the User and then
   * send Notification to the matched User with the content of uniqueScrape
   * @param scrapeUrl
   */
  matchAndSendNotification : function(scrapeUrl){
    const uniqueScrape = this.getUniqueScrape(scrapeUrl);

    repo.matchUser(uniqueScrape).then((matchedUser) =>{
      repo.sendNotification(matchedUser, uniqueScrape);
    })

  }



};
