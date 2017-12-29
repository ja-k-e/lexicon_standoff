const config = require('config');

import Adapters from '../adapters/Adapters';
import Renderers from '../renderers/Renderers';
import Game from './Game';
import Player from './Player';

const //
  STUB = config.env === 'development',
  STUB_COUNT = 3,
  STUB_PREFIX = 'TEST_USER_';

export default class State {
  constructor({ user, auth }) {
    this.auth = auth;
    this.user = user;
    this.initializeLaunch();
    this.initialize();
  }

  initializeLaunch() {
    this.launch = new Renderers.Launch(null, {
      createGame: this.createGame.bind(this),
      findGame: this.findGame.bind(this),
      signOut: this.signOut.bind(this),
      updateUser: this.updateUser.bind(this)
    });
    this.launch.renderInitial();
  }

  initialize() {
    if (this.user.currentGameId) {
      Adapters.Games
        .globalFind(this.user.currentGameId, true)
        .then(this.initializeGame.bind(this))
        .catch(() => {
          this.launch.render({ user: this.user });
        });
    } else {
      this.launch.render({ user: this.user });
    }
  }

  createGame() {
    Adapters.Games
      .masterCreate(this.user.id)
      .then(props => this.initializeGame(props, true))
      .catch(this.handleError.bind(this));
  }

  findGame(slug) {
    Adapters.Games
      .globalFind(slug, false)
      .then(this.initializeGame.bind(this))
      .catch(this.handleError.bind(this));
  }

  signOut() {
    Adapters.Users.globalDelete(this.user.id).then(() => {
      this.auth.signOut().then(() => {
        window.location.reload(true);
      });
    });
  }

  updateUser(params) {
    Adapters.Users.globalUpdate(this.user.id, params).then(() => {
      Adapters.Users.globalFind(this.user.id).then(user => {
        this.user = user;
        this.launch.render({ user });
      });
    });
  }

  // Handlers

  handleGameChanges() {
    if (this.game.changes.status) this.handleStatusChange();
    if (this.game.changes.votes) this.handleActionsChange();
    if (this.master) {
      if (this.game.isActions && this.game.changes.killedIds)
        this.handleKilledIdsChange();
    }
  }

  handleStatusChange() {
    if (this.game._) this.render();
  }

  handleKilledIdsChange() {
    let roundOverData = this.game.calculateRoundOverData(this.players),
      points = this.game.calculatePoints(this.players, roundOverData);
    // Add player points then update results
    Adapters.Players.masterTallyScores(this.players, points).then(() => {
      let {
          aliveCounts,
          aliveIds,
          deadCounts,
          deadIds,
          roundOver
        } = roundOverData,
        params = {
          status: 'results',
          aliveCounts,
          aliveIds,
          deadCounts,
          deadIds,
          roundOver
        };
      Adapters.Games.masterUpdateResults(this.game.id, params);
    });
  }

  handleActionsChange() {
    if (this.game.isActions) {
      if (this.master) {
        if (this.game.detectAllActionsSubmitted() && !this.actionLock) {
          this.actionLock = true;
          let {
            confusionVotes,
            confusionIds,
            killVotes,
            killedIds
          } = this.game.generateActionIds();
          Adapters.Players
            .masterActOnPlayers(
              this.game.id,
              this.players,
              killedIds,
              confusionIds
            )
            .then(() => {
              let playerCountAlive =
                this.game.playerCountAlive - killedIds.length;
              Adapters.Games
                .masterUpdateActionIds(
                  this.game.id,
                  confusionVotes,
                  confusionIds,
                  killVotes,
                  killedIds,
                  playerCountAlive
                )
                .then(() => {
                  this.actionLock = false;
                });
            });
        }
      }

      // Update everyone with who hasnt voted
      this.renderers.actions.renderWaiting({
        players: this.players,
        votes: this.game.votes
      });
    }
  }

  handleError(message) {
    alert(message);
  }

  // Initializers

  initializeGame({ game }, newGame = false) {
    if (STUB && newGame) this._devCreateStubbedPlayers(game.id);
    this.playerId = this.user.id;
    this.gameId = game.id;
    this.master = game.masterId === this.playerId;
    this.players = {};
    Adapters.Players.globalListenerAdded(this.gameId, player => {
      this.initializePlayer(player);
    });
    Adapters.Players.globalListenerRemoved(this.gameId, player => {
      this.removePlayer(player);
    });
    Adapters.Users.globalUpdate(this.playerId, { currentGameId: this.gameId });
    Adapters.Players
      .globalFindOrCreate(this.user, this.gameId, this.master)
      .then(player => {
        this.game = new Game({ state: this });
        Adapters.Games.globalListener(this.gameId, game => {
          if (game) {
            this.game.update(game);
            this.handleGameChanges();
          } else {
            this.rendered = false;
            Adapters.Users.globalUpdate(this.playerId, { currentGameId: null });
            this.launch.render({ user: this.user });
          }
        });
      });
  }

  initializePlayer(player) {
    this.players[player.id] = new Player(this, player);
    Adapters.Players.globalListenerPlayer(this.gameId, player.id, player => {
      if (player && this.players[player.id])
        this.players[player.id].update(player);
    });
    if (!this.rendered && this.player) this.initializeRenderers();
    if (this.player) {
      // We dont have it on initial render
      this.renderers.start.player = this.player;
      this.renderers.start.render({
        players: this.players,
        gameId: this.gameId
      });
    }
  }

  removePlayer(player) {
    delete this.players[player.id];
  }

  initializeRenderers() {
    if (this.renderers) {
      for (let key in this.renderers) this.renderers[key].remove();
    }
    this.renderers = {
      start: new Renderers.Start(this.player, {
        dispatchStart: () => this.dispatchStart(),
        dispatchEnd: () => this.dispatchEnd()
      }),
      turns: new Renderers.Turns(this.player, {
        dispatchReveal: () => this.dispatchReveal()
      }),
      reveal: new Renderers.Reveal(this.player, {
        dispatchActions: () => this.dispatchActions()
      }),
      actions: new Renderers.Actions(this.player, {
        dispatchAction: (p, a) => this.dispatchAction(p, a)
      }),
      results: new Renderers.Results(this.player, {
        dispatchEnd: () => this.dispatchEnd(),
        dispatchLeave: () => this.dispatchLeave(),
        dispatchTurns: () => this.dispatchTurns(),
        dispatchNewRound: () => this.dispatchNewRound()
      })
    };
    this.renderers.start.renderInitial();
    this.renderers.turns.renderInitial();
    this.renderers.reveal.renderInitial();
    this.renderers.actions.renderInitial();
    this.renderers.results.renderInitial();
    this.rendered = true;
  }

  // Dispatchers

  dispatchStart() {
    Adapters.Players.masterResetStart(this.players).then(() => {
      this.dispatchNewRound();
    });
  }

  dispatchTurns() {
    let topics = this.game.generateTopics(),
      turns = this.game.turns + 1,
      keyMasterId = turns > 2 ? this.game.generateKeyMasterId() : null;
    Adapters.Games
      .masterResetTurns(this.game.id, topics, turns, keyMasterId)
      .then(() => {
        Adapters.Games.masterUpdateStatus(this.game.id, 'turns');
      });
  }

  dispatchReveal() {
    Adapters.Games.masterUpdateStatus(this.game.id, 'reveal');
  }

  dispatchActions() {
    Adapters.Games.masterUpdateStatus(this.game.id, 'actions');
  }

  dispatchNewRound() {
    let roundData = this.game.generateRoundData();
    Adapters.Games
      .masterUpdateRoundData(this.game.id, roundData.game)
      .then(() => {
        Adapters.Players
          .masterUpdateRoundData(this.players, roundData.players)
          .then(() => {
            Adapters.Games.masterUpdateStatus(this.game.id, 'turns');
          });
      });
  }

  dispatchEnd() {
    Adapters.Players.masterDelete(this.game.id).then(() => {
      Adapters.Games.masterDelete(this.game.id);
    });
  }

  dispatchLeave() {
    if (this.game.playerCount <= 3) {
      this.dispatchEnd();
    } else {
      Adapters.Games.globalKill(this.game.id);
      Adapters.Users
        .globalUpdate(this.playerId, { currentGameId: null })
        .then(() => {
          Adapters.Players.globalLeave(this.game.id, this.user.id).then(() => {
            this.launch.render({ user: this.user });
          });
        });
    }
  }

  dispatchAction(playerId) {
    Adapters.Games.globalVote(this.game.id, this.user.id, playerId);
    if (STUB) this.devDispatchAction(playerId);
  }

  devDispatchAction(playerId) {
    let spoofs = this.game.playerCount - STUB_COUNT;
    if (this.player.isMaster)
      for (let i = 0; i < this.game.playerCount - 2; i++) {
        let id = `${STUB_PREFIX}${i + 1}`,
          victimId = this.players[id].isAlive ? playerId : this.player.id;
        Adapters.Games.globalVote(this.game.id, id, victimId);
      }
  }

  // Rendering

  render() {
    let status = this.game.status;
    let map = {
      turns: () => this.renderers.turns.render(this.game, this.players),
      reveal: () => this.renderers.reveal.render(this.game, this.players),
      actions: () => this.renderers.actions.render(this.game, this.players),
      results: () => this.renderers.results.render(this.game, this.players)
    };
    return map[status] ? map[status]() : null;
  }

  get player() {
    return this.players[this.playerId];
  }

  // Private

  _devCreateStubbedPlayers(gameId) {
    let avatars = Renderers.Launch._avatars;
    for (let i = 0; i < STUB_COUNT; i++) {
      let name = avatars[Math.floor(Math.random() * avatars.length)],
        avatar = Renderers.Launch._avatarUrl(name);
      Adapters.Players.globalCreate(
        gameId,
        {
          id: `${STUB_PREFIX}${i + 1}`,
          name: `Player${i + 1}`,
          avatar
        },
        false
      );
    }
  }
}
