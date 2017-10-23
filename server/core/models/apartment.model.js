'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = require('./user.model');

/**
 * This schema will keep the apartment objects entry
 * @type {mongoose.Schema}
 */

var ApartmentSchema = new Schema({
  room        : String,
  rent        : String,
  size        : String,
  location    : String,
  zip         : String,
  provider    : String, //immobilienScout24, ebay, immowelt
  exposeId    : String,
  title       : String,
  details     : String,
  sent        : [UserSchema],
  creationTime: {'type': Date, 'default': Date.now},
  lastModTime : Date,

}, {minimize: false}); //we need the empty objects too

module.exports = ApartmentSchema;
