'use strict';

let xkcdPassword = require('xkcd-password');
let Promise = require('digs-common/promise');
let pw = Promise.promisifyAll(new xkcdPassword());
let _ = require('digs-common');

const DEFAULTS = {
  numWords: 2,
  minLength: 5,
  maxLength: 8
};

function generatePassword(opts, done) {
  if (_.isFunction(opts)) {
    done = opts;
  }
  opts = _.defaults(opts || {}, DEFAULTS);
  return pw.generateAsync(opts)
    .nodeify(done);
}

module.exports = generatePassword;
