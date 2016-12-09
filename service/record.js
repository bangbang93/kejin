/**
 * Created by bangbang93 on 2016/12/8.
 */
'use strict';
const RecordModel = require('../model/record');

exports.listGames = (uid)=>RecordModel.listGames(uid);

exports.create = function (uid, record) {
  record.uid = uid;
  return RecordModel.create(record);
};

exports.findByUid = (uid)=> RecordModel.findByUid(uid);

exports.edit = function (uid, id, record) {
  return RecordModel.getById(id)
    .then((originRecord)=>{
      if (originRecord.uid != uid){
        throw new Error('not owner');
      }
    })
    .then(()=>{
      return RecordModel.update(id, record);
    });
};

exports.getById = (id)=> RecordModel.getById(id);