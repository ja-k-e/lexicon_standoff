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

  globalVote(gameId, actingPlayerId, playerId) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .child('votes')
        .update({ [actingPlayerId]: playerId })
        .then(resolve)
        .catch(reject);
    });
  }

  globalListener(gameId, handler) {
    this.db.ref(this.r(gameId)).on('value', snap => {
      handler(snap.val());
    });
  }

  // Master Actions

  masterCreate(userId) {
    return new Promise((resolve, reject) => {
      let id = new Slugs().loadSlug();
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

  masterUpdateActionIds(
    gameId,
    confusionVotes,
    confusionIds,
    killVotes,
    killedIds,
    playerCountAlive
  ) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .update({
          confusionVotes,
          confusionIds,
          killedIds,
          killVotes,
          playerCountAlive
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

  masterResetRound(gameId, topics) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .update({
          votes: {},
          killedIds: [],
          killVotes: {},
          roundOver: false,
          aliveCounts: { imposter: 0, agent: 0 },
          aliveIds: [],
          deadCounts: { imposter: 0, agent: 0 },
          deadIds: [],
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

  get _key() {
    return 'games';
  }
}
