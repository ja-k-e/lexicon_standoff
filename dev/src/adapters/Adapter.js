const config = require('config');

export default class Adapter {
  constructor() {
    this.root = config.env;
  }

  initialize({ db }) {
    this.db = db;
  }
}
