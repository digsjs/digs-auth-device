'use strict';

const defaultAdapterSuite = require('./suites/adapter');
const DefaultAdapter = require('../lib/adapter');
const _ = require('digs-common').utils;


function digsMock(sandbox) {
  const digs = require('digs-common/test/mocks/digs')(sandbox);
  digs.types = sandbox.stub().returns(require('digs-data/lib/types'));
  digs.model = sandbox.stub();
  return digs;
}

describe('DefaultAdapterSuite',
  _.partial(defaultAdapterSuite, {
    func: DefaultAdapter,
    digsMockFunc: digsMock
  }));

