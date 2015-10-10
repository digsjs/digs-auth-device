'use strict';

let _ = require('digs-common');
let scheme = require('hapi-auth-bearer-token');
let generateToken = require('xkcd-password');

function digsAuthDevice(digs, options, done) {
  options = options || {};

  let adapter;
  if (_.isFunction(options.adapter)) {
    adapter = options.adapter(options.adapterOpts, digs);
  } else {
    adapter = require('./adapter')(options.adapterOpts, digs);
  }

  digs.route({
    method: 'POST',
    path: '/register',
    handler: function register(req, reply) {
      if (req.auth.isAuthenticated) {
        return reply({token: req.auth.credentials.token});
      }
      adapter.register(req.payload)
        .then(function(device) {
          reply({token: device.token});
        });
    }
  });

  digs.register(scheme, function createStrategy(err) {
    if (err) {
      throw new Error(err);
    }

    digs.auth.strategy('device', 'bearer', {
      validateFunc: adapter.validate.bind(adapter)
    });

    done();
  });
}

digsAuthDevice.attributes = {
  pkg: require('../package.json'),
  dependencies: [
    'digs'
  ]
};

module.exports = digsAuthDevice;
