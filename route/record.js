/**
 * Created by bangbang93 on 2016/12/8.
 */
'use strict';
const express = require('express');
const router = express.Router();
const RecordService = require('../service/record');

router.use(function (req, res, next) {
  if (!req.session.uid){
    return res.status(401).json({
      msg: 'need login'
    })
  }
  next();
});


router.get('/games', function (req, res, next) {
  let uid = req.session.uid;
  RecordService.listGames(uid)
    .then((games)=>{
      res.json(games);
    })
    .catch(next);
});

router.post('/', function (req, res, next) {

  let uid = req.session.uid;
  let record = req.body;

  RecordService.create(uid, record)
    .then((record)=>{
      res.status(201).json(record);
    })
    .catch(next);
});

router.get('/', function (req, res, next) {
  let uid = req.session.uid;

  RecordService.findByUid(uid)
    .then((records)=>{
      res.json(records);
    })
    .catch(next);

});

router.put('/:id', function (req, res, next) {
  let id = req.params.id;
  let uid = req.session.uid;

  let record = req.body;

  RecordService.edit(uid, id, record)
    .then(()=>{
      res.status(200).json({
        msg: 'success'
      })
    })
    .catch((err)=>{
      if (err.message == 'not owner'){
        return res.status(403).json({
          msg: err.message
        })
      }
      next(err);
    })
});

router.get('/:id', function (req, res, next) {
  let id = req.params.id;
  let uid = req.session.uid;

  RecordService.getById(id)
    .then((record)=>{
      if (record.uid != uid){
        return res.status(403).json({
          msg: 'not owner'
        });
      }
      return res.json(record);
    })
    .catch(next);
});



module.exports = router;