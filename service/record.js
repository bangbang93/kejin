/**
 * Created by bangbang93 on 2016/12/8.
 */
'use strict';
const RecordModel = require('../model/record');

exports.listGames = ()=>RecordModel.listGames();

exports.create = function (uid, record) {
  record.uid = uid;
  return RecordModel.create(record);
};

exports.findByUid = (uid)=> RecordModel.findByUid(uid);