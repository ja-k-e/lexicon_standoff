import Adapter from './Adapter';

export default class App extends Adapter {
  findVersion(version) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .get()
        .then(doc => {
          if (doc.exists) resolve(doc.data().version);
          else resolve(this.updateVersion(version));
        })
        .catch(reject);
    });
  }

  updateVersion(version) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .set({ version })
        .then(resolve)
        .catch(reject);
    });
  }
}
