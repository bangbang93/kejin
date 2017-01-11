'use strict';
const express = require('express');
const router = express.Router();
const history = require('connect-history-api-fallback');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/kejin');
});

router.get(/^\/kejin/, history({
  index: '/index.html'
}));

module.exports = router;
