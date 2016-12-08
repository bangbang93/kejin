/**
 * Created by bangbang93 on 2016/11/17.
 */
'use strict';
const PrettyStream = require('bunyan-prettystream');

const stream = new PrettyStream();
stream.pipe(process.stdout);

module.exports = {
  module: {
    name: 'module',
    level: 'trace',
    stream
  }
};