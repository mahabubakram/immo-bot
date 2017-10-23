'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * This schema will keep the user document and its properties
 * @type {mongoose.Schema}
 */

var UserSchema = new Schema({
  displayName : String,
  email       : String,
  creationTime: {'type': Date, 'default': Date.now},
  lastModTime : Date,
  lastLogin   : Date,

  authentication: {
    passwordHash                : String,
    authenticationType          : Number,
    isConfirmed                 : {'type': Boolean, 'default': false},
    confirmationToken           : String,
    isActive                    : {'type': Boolean, 'default': false},
    failedAttempts              : {'type': Number, 'default': 0},
    isLocked                    : {'type': Boolean, 'default': false},
    unlockToken                 : String,
    isPasswordReset             : {'type': Boolean, 'default': false},
    resetPasswordToken          : String,
    resetPasswordTokenExpiryDate: {'type': Date},
  }

}, {minimize: false}); //we need the empty objects too

module.exports = UserSchema;
