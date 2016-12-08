/**
 * Created by bangbang93 on 16-9-28.
 */
'use strict';
const mongoose = require('mongoose');
const Config = require('./config/database');

mongoose.Promise = require('bluebird');

mongoose.connect(`mongodb://${Config.mongodb.host}/${Config.mongodb.db}`);

exports.mongoose = mongoose;

const redis = require('co-redis')(require('redis').createClient());

exports.redis = redis;