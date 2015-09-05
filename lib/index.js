'use strict';

let _ = require('digs-common');

function digsAuth(digs, options, done) {
  options = options || {};

  if (!options.key) {
    return done(new Error('digs-device-auth: "key" must be specified in options'));
  }

  let adapter;
  if (_.isFunction(options.adapter)) {
    adapter = options.adapter(options.adapterOpts, digs);
  } else {
    adapter = require('./adapter')(options.adapterOpts, digs);
  }

  digs.register(require('hapi-auth-bearer'), {
    validateFunc:
  })

  digs.register(require('hapi-auth-jwt2'), function next(err) {
    if (err) {
      return done(err);
    }

    digs.auth.strategy('jwt', 'jwt', true, {
      key: options.key,
      validateFunc: adapter.validate,
      verifyOptions: {
        algorithms: ['HS256']
      }
    });

    digs.handler('authenticate', adapter.authenticate.bind(adapter));

    done();
  });
}

digsAuth.attributes = {
  pkg: require('../package.json'),
  dependencies: ['digs']
};

module.exports = digsAuth;
