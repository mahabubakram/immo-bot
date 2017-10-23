const mongoose = require('mongoose');
const schemas = require('./schemas');

const mongoDbUrl = 'mongodb://localhost/scrape-immo';
const connection= {};
const connectionCache = {};

module.exports = {

  /**
   * @param {string} url mongo connection url
   * @return {string} mongo url without user credentials
   * @private
   */
  _printMongoUrl: function(url) {
    return url.split('@')[1] || url;
  },

  _printDbName: function(url) {
    return url.split('/')[3] || url;
  },

  getConnection: function () {
    connection.mongoDb = mongoose.createConnection(mongoDbUrl);
    connection.mongoDb.on('error', (error) => {
      console.log('Failed to connect to MongoDB: ' + error.message);
    });
    connection.mongoDb.once('open', (callback) => {
      console.log(`Connection, with the MongoDB: ${this._printMongoUrl(mongoDbUrl)} is open!`);
    });
    connectionCache[this._printDbName(mongoDbUrl)] = connection;

    return connection.mongoDb;

  },

  /**
   * Returns an models based on the name and schema.
   * @param {string} schemaName the schema to be used
   * @returns {mongoose.Model} The model for the current company.
   */
  getModel(schemaName) {


    const connection = this.getConnection();
    let model = null;

    const modelSchema = schemas[schemaName];

    if (modelSchema) {
      try {
        model = connection.model(schemaName, modelSchema);
      } catch (err) {
        throw {
          nodeException: JSON.stringify(err),
          reason       : `Error in for the Schema ${schemaName} in the MongoDB ${connection.host}.`
        };
      }
    }else{
      throw {
        reason       : `Error in for the Schema ${schemaName} in the MongoDB ${connection.host}.`
      };
    }
    return model;
  }



}
