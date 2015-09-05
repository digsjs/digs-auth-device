'use strict';

let define = require('digs-common/define');

module.exports = define({
  init: function init() {
    const sessions = {};

    return define.extend(this, {
      validate(decoded, req, callback) {
        decoded = decoded || {};
        callback(null, Boolean(sessions[decoded.id]));
      },
      authenticate(params, callback) {
        throw new Error('not implemented');
      }
    });
  }
});
