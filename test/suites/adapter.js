'use strict';

const digsLoggerSuite = require('digs-common/test/defines/suites/logger');
const _ = require('digs-common').utils;

function defaultAdapterSuite(opts) {
  opts = opts || {};
  let sandbox;
  const DefaultAdapter = opts.func;

  beforeEach(function() {
    sandbox = sinon.sandbox.create('DefaultAdapter');
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('initialization', function() {
    it('should be a function', function() {
      expect(DefaultAdapter).to.be.a('function');
    });
  });
}

module.exports = _.flow(digsLoggerSuite, defaultAdapterSuite);
