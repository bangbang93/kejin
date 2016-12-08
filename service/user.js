/**
 * Created by bangbang93 on 2016/12/8.
 */
'use strict';
const request = require('co-request');
const UserModel = require('../model/user');

exports.tokenLogin = function (token) {
  return request.post('https://auth.bangbang93.com/user/token', {
    form: {
      token
    },
    json: true,
  })
    .then((res)=>{
      if (res.statusCode == 200){
        let accessToken = res.body['accessToken'];
        return request.get('https://auth.bangbang93.com/user/profile?access_token=' + accessToken, {
          json: true
        });
      } else {
        let err = new Error('token error');
        err.status = res.statusCode;
        err.body = res.body;
        throw err;
      }
    })
    .then((res)=>{
      if (res.statusCode == 200){
        let user = res.body;
        user.uid = user.id;
        return UserModel.upsert(user.uid, user).return(user);
      } else {
        let err = new Error('auth error');
        err.status = res.statusCode;
        err.body = res.body;
        throw err;
      }
    })
};

exports.getByUid = (uid)=> UserModel.getByUid(uid);