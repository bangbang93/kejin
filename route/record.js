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
  RecordService.listGames()
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



module.exports = router;