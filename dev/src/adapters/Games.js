import Slugs from '../generators/Slugs';
import Adapter from './Adapter';

// All Database Actions for Games
export default class Games extends Adapter {
  // Global Actions

  globalFind(id, playerExists = false) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('games')
        .doc(id)
        .get()
        .then(doc => {
          if (doc.exists) {
            let game = doc.data();
            if (game.inProgress === true && !playerExists)
              reject(`Game ${id} is already in progress`);
            else resolve({ game });
          } else reject(`No Game Found with name ${id}`);
        });
    });
  }

  globalAction(id, playerId, playerIds) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('games')
        .doc(id)
        .update({ [`actions.${playerId}`]: playerIds })
        .then(resolve)
        .catch(reject);
    });
  }

  globalSelection(id, playerId, selection, time) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('games')
        .doc(id)
        .update({ [`selections.${playerId}`]: { selection, time } })
        .then(resolve)
        .catch(reject);
    });
  }

  globalListener(id, handler) {
    this.unsubscribeGameListener = this.db
      .collection('app')
      .doc(this.root)
      .collection('games')
      .doc(id)
      .onSnapshot(doc => {
        handler(doc.exists ? doc.data() : null);
      });
  }

  globalKill() {
    this.unsubscribeGameListener();
  }

  // Master Actions

  masterCreate(userId) {
    return new Promise((resolve, reject) => {
      this._generateUniqueId()
        .then(id => {
          this.db
            .collection('app')
            .doc(this.root)
            .collection('games')
            .doc(id)
            .set({ id, status: 'start', inProgress: false, masterId: userId })
            .then(() => resolve(this.globalFind(id)))
            .catch(reject);
        })
        .catch(reject);
    });
  }

  masterDelete(id) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('games')
        .doc(id)
        .delete()
        .then(resolve)
        .catch(reject);
    });
  }

  masterUpdate(id, params) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('games')
        .doc(id)
        .update(params)
        .then(resolve)
        .catch(reject);
    });
  }

  // Private

  // Recursively finding a unique id
  _generateUniqueId() {
    return new Promise((resolve, reject) => {
      let slug = new Slugs().loadSlug();
      this.db
        .collection('app')
        .doc(this.root)
        .collection('games')
        .doc(slug)
        .get()
        .then(doc => {
          if (doc.exists) resolve(this._generateUniqueId());
          else resolve(slug);
        })
        .catch(reject);
    });
  }

  get _key() {
    return 'games';
  }
}
