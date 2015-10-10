'use strict';

let common = require('digs-common');
let define = common.define;
let DigsLogger = common.defines.DigsLogger;
let Token = define.convertConstructor(require('xkcd-password'));

const DefaultAdapter = define({
  init() {
    const digs = this._digs;
    const types = digs.types();

    this.DeviceToken = digs.model('DeviceToken', {
      id: types.string()
        .regex(/[A-Za-z0-9_-]+/)
        .required(),
      token: types.string()
        .regex(/[a-z]{4,6}-[a-z]{4,6}-[a-z]{4,6}-[a-z]{4,6}/)
        .required()
    }, {
      pk: 'token'
    });
  },
  methods: {
    register(payload) {
      const id = payload.id;

      return Token.generate({
        numWords: 4,
        minLength: 4,
        maxLength: 6
      })
        .bind(this)
        .then(function join(result) {
          const token = result.join('-');
          const device = this.DeviceToken({
            id: id,
            token: token
          });
          return device.save();
        });
    },
    validate(token, done) {
      return this.DeviceToken.get(token).run()
        .then(function(result) {
          if (result) {
            return {
              token: result.token
            };
          }
        }).nodeify(done);
    }
  }
});

module.exports = DigsLogger.compose(DefaultAdapter);
