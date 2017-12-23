const config = require('config'),
  ROOT = config.env;

export default class Adapter {
  constructor() {}

  r(val) {
    let p = typeof val === 'string' ? val : val.join('/');
    return `${ROOT}/${this._key}/${p}`;
  }

  get db() {
    return firebase.database();
  }
}
