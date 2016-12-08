/**
 * Created by bangbang93 on 2016/12/8.
 */
'use strict';
const mongoose = require('../models').mongoose;

let Schema = new mongoose.Schema({
  username: String,
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  email: String,
  nickname: String,
});

let Model = exports.Model = mongoose.model('user', Schema);

exports.getByUsername = function (username) {
  return Model.findOne({
    username
  }).exec();
};

exports.getByUid = function (uid) {
  return Model.findOne({
    uid
  }).exec();
};

exports.create = function (user) {
  return Model.create(user);
};

exports.upsert = function (uid, user) {
  return Model.update({
    uid
  }, user, {
    upsert: true
  }).exec();
};
