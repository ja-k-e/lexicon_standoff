import Adapter from './Adapter';

export default class Players extends Adapter {
  // Global Actions

  globalFindOrCreate(user, gameId, master) {
    return new Promise((resolve, reject) => {
      this.globalFind(user.id)
        .then(({ player }) => {
          resolve({ player });
        })
        .catch(() => {
          this.globalCreate(gameId, user, master)
            .then(() => {
              this.globalFind(user.id)
                .then(({ player }) => {
                  resolve({ player });
                })
                .catch(reject);
            })
            .catch(reject);
        });
    });
  }

  globalCreate(gameId, user, master) {
    return new Promise((resolve, reject) => {
      let { id, name, avatar } = user;
      this.db
        .collection('app')
        .doc(this.root)
        .collection('players')
        .doc(id)
        .set({ id, gameId, name, avatar, master, role: 'joined', score: 0 })
        .then(resolve)
        .catch(reject);
    });
  }

  globalDelete(id) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('players')
        .doc(id)
        .delete()
        .then(resolve)
        .catch(reject);
    });
  }

  globalFind(id) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('players')
        .doc(id)
        .get()
        .then(doc => {
          if (doc.exists) resolve({ player: doc.data() });
          else reject();
        })
        .catch(reject);
    });
  }

  globalListenerPlayerEvents(gameId, handleAdded, handleRemoved) {
    this.db
      .collection('app')
      .doc(this.root)
      .collection('players')
      .where('gameId', '==', gameId)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges.forEach(change => {
          if (change.type === 'added') handleAdded(change.doc.data());
          if (change.type === 'removed') handleRemoved(change.doc.data());
        });
      });
  }

  globalListenerPlayer(id, handler) {
    this.db
      .collection('app')
      .doc(this.root)
      .collection('players')
      .doc(id)
      .onSnapshot(doc => {
        handler(doc.exists ? doc.data() : null);
      });
  }

  // Master Actions

  masterDeleteAll(gameId) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('players')
        .where('gameId', '==', gameId)
        .get()
        .then(querySnapshot => {
          let batch = this.db.batch();
          querySnapshot.forEach(doc => {
            batch.delete(doc.ref);
          });
          batch
            .commit()
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  masterActOnPlayers(gameId, players, killedIds) {
    return new Promise((resolve, reject) => {
      let batch = this.db.batch();
      for (let playerId in players) {
        let ref = this.db
          .collection('app')
          .doc(this.root)
          .collection('players')
          .doc(playerId);
        batch.update(ref, { alive: !killedIds.includes(playerId) });
      }
      batch
        .commit()
        .then(resolve)
        .catch(reject);
    });
  }

  masterResetStart(players) {
    return new Promise((resolve, reject) => {
      let batch = this.db.batch();
      for (let playerId in players) {
        let ref = this.db
          .collection('app')
          .doc(this.root)
          .collection('players')
          .doc(playerId);
        batch.update(ref, { score: 0 });
      }
      batch
        .commit()
        .then(resolve)
        .catch(reject);
    });
  }

  masterTallyScores(players, points) {
    return new Promise((resolve, reject) => {
      let batch = this.db.batch();
      for (let playerId in players) {
        let pointsVal = points[playerId],
          score = players[playerId].score + pointsVal;
        if (pointsVal) {
          let ref = this.db
            .collection('app')
            .doc(this.root)
            .collection('players')
            .doc(playerId);
          batch.update(ref, { score });
        }
      }
      batch
        .commit()
        .then(resolve)
        .catch(reject);
    });
  }

  masterUpdateRoundData(players, { playerIdsImposters, playerIdsAgents }) {
    return new Promise((resolve, reject) => {
      let batch = this.db.batch();
      for (let playerId in players) {
        let role;
        if (playerIdsImposters.includes(playerId)) role = 'imposter';
        else if (playerIdsAgents.includes(playerId)) role = 'agent';
        else role = 'agent';
        let ref = this.db
          .collection('app')
          .doc(this.root)
          .collection('players')
          .doc(playerId);
        batch.update(ref, { alive: true, role });
      }
      batch
        .commit()
        .then(resolve)
        .catch(reject);
    });
  }

  // Private

  get _key() {
    return 'players';
  }
}
