import Adapter from './Adapter';

export default class Players extends Adapter {
  // Global Actions

  globalFindOrCreate(user, gameId, master) {
    return new Promise((resolve, reject) => {
      this.globalFind(gameId, user.id)
        .then(({ player }) => {
          resolve({ player });
        })
        .catch(() => {
          this.globalCreate(gameId, user, master)
            .then(() => {
              this.globalFind(gameId, user.id)
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
      let { id, name, image, alive } = user,
        params = {
          id,
          gameId,
          name,
          image,
          master,
          score: 0,
          scoreRound: 0
        };
      this.db
        .ref(this.r([gameId, id]))
        .set(params)
        .then(resolve)
        .catch(reject);
    });
  }

  globalLeave(gameId, playerId) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r([gameId, playerId]))
        .set(null)
        .then(resolve)
        .catch(reject);
    });
  }

  globalFind(gameId, userId) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r([gameId, userId]))
        .once('value')
        .then(snap => {
          let value = snap.val();
          if (value !== null) resolve({ player: value });
          else reject();
        })
        .catch(reject);
    });
  }

  globalListenerAdded(gameId, handler) {
    this.db.ref(this.r(gameId)).on('child_added', snap => {
      handler(snap.val());
    });
  }

  globalListenerRemoved(gameId, handler) {
    this.db.ref(this.r(gameId)).on('child_removed', snap => {
      let player = snap.val();
      this.db.ref(this.r([gameId, player.id])).off();
      handler(player);
    });
  }

  globalListenerPlayer(gameId, playerId, handler) {
    this.db.ref(this.r([gameId, playerId])).on('value', snap => {
      handler(snap.val());
    });
  }

  // Master Actions

  masterDelete(gameId) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(gameId))
        .set(null)
        .then(resolve)
        .catch(reject);
    });
  }

  masterActOnPlayers(gameId, players, killedIds, confusionIds) {
    return new Promise((resolve, reject) => {
      let playerCount = Object.keys(players).length;
      for (let playerId in players) {
        let params = { confused: confusionIds.includes(playerId) };
        if (killedIds.includes(playerId)) params.alive = false;
        this.db
          .ref(this.r([gameId, playerId]))
          .update(params)
          .then(() => {
            playerCount--;
            if (playerCount <= 0) resolve();
          })
          .catch(reject);
      }
    });
  }

  masterResetStart(players) {
    return new Promise((resolve, reject) => {
      let playerCount = Object.keys(players).length;
      for (let playerId in players) {
        let params = { score: 0 };
        this.db
          .ref(this.r([players[playerId].gameId, playerId]))
          .update(params)
          .then(() => {
            playerCount--;
            if (playerCount <= 0) resolve();
          })
          .catch(reject);
      }
    });
  }

  masterTallyScores(players, points) {
    return new Promise((resolve, reject) => {
      let playerCount = Object.keys(players).length;
      for (let playerId in players) {
        let pointsVal = points[playerId],
          player = players[playerId];
        if (pointsVal) {
          let scoreRound = player._.scoreRound + pointsVal,
            score = player._.score + pointsVal;
          this.db
            .ref(this.r([player.gameId, playerId]))
            .update({ score, scoreRound })
            .then(() => {
              playerCount--;
              if (playerCount <= 0) resolve();
            })
            .catch(reject);
        } else {
          playerCount--;
          if (playerCount <= 0) resolve();
        }
      }
    });
  }

  masterUpdateRoundData(players, { playerIdsImposters, playerIdsAgents }) {
    return new Promise((resolve, reject) => {
      let playerCount = Object.keys(players).length;
      for (let playerId in players) {
        let player = players[playerId];
        let role,
          confused = false,
          alive = true,
          scoreRound = 0;
        if (playerIdsImposters.includes(playerId)) role = 'imposter';
        else if (playerIdsAgents.includes(playerId)) role = 'agent';
        else role = 'agent';
        this.db
          .ref(this.r([player.gameId, playerId]))
          .update({ role, alive, confused, scoreRound })
          .then(() => {
            playerCount--;
            if (playerCount <= 0) resolve();
          })
          .catch(reject);
      }
    });
  }

  // Private

  get _key() {
    return 'players';
  }
}
