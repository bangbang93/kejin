/**
 * Created by bangbang93 on 2016/12/8.
 */
'use strict';
const express = require('express');
const router = express.Router();
const RecordService = require('../service/record');

router.get('/games', function (req, res, next) {
  RecordService.listGames()
    .then((games)=>{
      res.json(games);
    })
});

router.post('/', function (req, res, next) {
  if (req.session.uid){
    return res.status(401).end();
  }

  let uid = req.session.uid;
  let record = req.body;

  RecordService.create(uid, record)
    .then((record)=>{
      res.json(record);
    })
    .catch(next);
});



module.exports = router;