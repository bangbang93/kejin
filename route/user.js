'use strict';
const express = require('express');
const router = express.Router();
const UserService = require('../service/user');

router.get('/login', function(req, res) {
  res.redirect(`https://auth.bangbang93.com/login.html?redirect_uri=${req.protocol}://${req.hostname}/user/login/callback`);
});

router.get('/login/callback', function (req, res, next) {
  let token = req.query.code;

  if (!token){
    return res.status(400).json({
      err: 'missing token'
    });
  }

  UserService.tokenLogin(token)
    .then((user)=>{
      req.session.uid = user['id'];
      req.session.username = user['username'];
      req.session.email = user['email'];
      res.redirect('/');
    })
    .catch(next);
});

router.get('/profile', function (req, res, next) {
  if (req.session.uid){
    UserService.getByUid(res.session.uid)
      .then((user)=>{
        res.json(user);
      })
      .catch(next);
  } else {
    res.status(401);
  }
});

module.exports = router;
