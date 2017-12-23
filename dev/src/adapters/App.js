import Adapter from './Adapter';

const VERSION_REF = '_version';

export default class App extends Adapter {
  findVersion() {
    return new Promise((resolve, reject) => {
      this.db
        .ref(VERSION_REF)
        .once('value')
        .then(snap => {
          resolve(snap.val());
        })
        .catch(reject);
    });
  }

  updateVersion(version) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(VERSION_REF)
        .set(version)
        .then(resolve)
        .catch(reject);
    });
  }
}
