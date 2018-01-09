import Slugs from '../generators/Slugs';
import Adapter from './Adapter';

// All Database Actions for Games
export default class Games extends Adapter {
  // Global Actions

  globalFind(gameId, playerExists = false) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .once('value')
        .then(snap => {
          let game = snap.val();
          if (game === null) reject(`No Game Found with name ${gameId}`);
          else if (game.inProgress === true && !playerExists)
            reject(`Game ${gameId} is already in progress`);
          else resolve({ game });
        })
        .catch(reject);
    });
  }

  globalAction(gameId, actingPlayerId, playerId) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .child('actions')
        .update({ [actingPlayerId]: playerId })
        .then(resolve)
        .catch(reject);
    });
  }

  globalSelection(gameId, playerId, selection) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .child('selections')
        .update({ [playerId]: selection })
        .then(resolve)
        .catch(reject);
    });
  }

  globalListener(gameId, handler) {
    this.db.ref(this.r(gameId)).on('value', snap => {
      handler(snap.val());
    });
  }

  globalKill(gameId) {
    this.db.ref(this.r(gameId)).off();
  }

  // Master Actions

  masterCreate(userId) {
    return new Promise((resolve, reject) => {
      this._generateUniqueId()
        .then(id => {
          // Set listener
          this.db.ref(this.r(id)).on('value', snap => {
            let game = snap.val();
            if (game && game.id === id) {
              // Kill listener
              this.db.ref(this.r(id)).off();
              // Return the Game
              resolve({ game });
            }
          });
          // Create Game
          this.db
            .ref(this.r(id))
            .set({ id, status: 'start', inProgress: false, masterId: userId })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  masterDelete(gameId) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .set(null)
        .then(resolve)
        .catch(reject);
    });
  }

  masterUpdateActionIds(gameId, killVotesByPlayer, killVotes, killedIds) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .update({
          killVotesByPlayer,
          killedIds,
          killVotes
        })
        .then(resolve)
        .catch(reject);
    });
  }

  masterUpdateResults(gameId, params) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .update(params)
        .then(resolve)
        .catch(reject);
    });
  }

  masterResetSelections(gameId, topics, selections) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .update({
          actions: {},
          selections: {},
          selections,
          topics
        })
        .then(resolve)
        .catch(reject);
    });
  }

  masterUpdateRoundData(gameId, gameData) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .update(gameData)
        .then(resolve)
        .catch(reject);
    });
  }

  masterUpdateStatus(gameId, status) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .update({ status })
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
        .ref(this.r(`games/${slug}`))
        .once('value')
        .then(snap => {
          if (snap.val() === null) resolve(slug);
          else resolve(this._generateUniqueId());
        })
        .catch(reject);
    });
  }

  get _key() {
    return 'games';
  }
}
