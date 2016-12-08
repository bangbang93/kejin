/**
 * Created by bangbang93 on 2016/12/8.
 */
'use strict';
const mongoose = require('../models').mongoose;

let Schema = new mongoose.Schema({
  date: Date,
  game: String,
  price: Number,
  target: String,
  time: Number,
  shipment: String,
  salary: Number,
  gains: Number,
  expend: Number,
  surplus: Number,
  uid: mongoose.Schema.Types.ObjectId,
});

let Model = mongoose.model('record', Schema);

exports.create = function (record) {
  return Model.create(record);
};

exports.listGames = function () {
  return Model.distinct('game').exec();
};

exports.findByUid = function (uid) {
  return Model.find({
    uid
  }).exec();
};