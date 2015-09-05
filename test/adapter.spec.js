'use strict';

describe('DefaultAdapter', function() {
  let sandbox;
  let DefaultAdapter = require('../lib/adapter');

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
});
