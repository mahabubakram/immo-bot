const scrapeIt = require('scrape-it');
const scrapeConfig = require('./scrape.config');
const _ = require('lodash');
const Promise = require('bluebird');


module.exports = {
  getAllScrape: function (itemUrl, apartmentModel) {
    //console.log(fetchConfig)
    return new Promise((resolve) =>{
      scrapeIt(itemUrl, scrapeConfig.getConfiguration(), (cb) =>{
        console.log(cb);
      }).then(items => {
        var apartmentObjects = _.map(items.pages, _.partialRight(_.pick, ['room', 'rent', 'size', 'location', 'zip', 'provider', 'exposeId', 'title', 'details'] ));
        this.createDbEntry(apartmentModel, apartmentObjects);

        var ss =_.map(_.map(apartmentObjects, _.partialRight(_.pick, ['exposeId'])), 'exposeId') ;
        var query = apartmentModel.find({});
        query.where('exposeId').in(ss);
        query.exec((err, docs) => {
          console.log(docs);
        });

        resolve(items);
      });
    });
  },

  /**
   * This function will return the unique scrape items via matching with the database
   * @param allScrape
   */
  getUniqueScrape: function(allScrape){
    return new Promise((resolve) =>{
     resolve(allScrape);
    });
  },

  /**
   * This function will take the param as the unique scrape which have been inserted into DB
   * And then it will check whether it has sent the notification to the matched User or not.
   * And if not sent then it will fetch those matched User who have not yet got the notification
   * @param uniqueScrape
   */
  matchUser: function(uniqueScrape){
    return new Promise((resolve, reject) => {
      resolve();
      reject();
    });
  },

  /**
   * This function will send the notification to the matched User of the content based on the unique Scrape
   * Depend on the type of notification it will send notification
   * It will send notification now for the email only
   * @param matchedUser
   * @param uniqueScrape
   */
  sendNotification : function(matchedUser, uniqueScrape){
    return;

  },

  /**
   *
   * @param err
   * @returns {Promise|Promise.<*>}
   */
  dbRejected: function(err){
    return Promise.reject({
      dbErrorMessage: JSON.stringify(err)
    });
  },

  /**
   *
   * @param dbModel
   * @param dbEntryObject
   */
  createDbEntry: function(dbModel, dbEntryObject){
    dbModel.create(dbEntryObject).catch(this.dbRejected);
  }

};
