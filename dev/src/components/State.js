const config = require('config');

import Adapters from '../adapters/Adapters';
import Renderers from '../renderers/Renderers';
import Game from './Game';
import Topics from '../generators/Topics';
import Player from './Player';

const //
  STUB = config.env === 'development',
  STUB_COUNT = 4,
  STUB_PREFIX = 'TEST_USER_';

export default class State {
  constructor({ user, auth }) {
    this.auth = auth;
    this.user = user;
    this.initializeLaunch();
    this.initialize();
  }

  initializeLaunch() {
    this.launch = new Renderers.Launch(
      null,
      {
        createGame: this.createGame.bind(this),
        findGame: this.findGame.bind(this),
        signOut: this.signOut.bind(this),
        updateUser: this.updateUser.bind(this)
      },
      true
    );
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
    if (this.game.changes.actions) this.handleActionsChange();
    if (this.game.changes.selections) this.handleSelectionsChange();
    if (this.master) {
      if (this.game.isActions && this.game.changes.killedIds)
        this.handleKilledIdsChange();
    }
  }

  handleStatusChange() {
    if (this.game._) this.render();
  }

  handleKilledIdsChange() {
    let points = this.game.calculatePoints(this.players);
    // Add player points then update results
    Adapters.Players.masterTallyScores(this.players, points).then(() => {
      let params = { status: 'results' };
      Adapters.Games.masterUpdateResults(this.game.id, params);
    });
  }

  handleActionsChange() {
    if (this.game.isActions) {
      if (this.master) {
        if (this.game.detectAllActionsSubmitted() && !this.actionLock) {
          this.actionLock = true;
          let {
            killVotesByPlayer,
            killVotes,
            killedIds
          } = this.game.generateActionIds();
          Adapters.Players
            .masterActOnPlayers(this.game.id, this.players, killedIds)
            .then(() => {
              Adapters.Games
                .masterUpdateActionIds(
                  this.game.id,
                  killVotesByPlayer,
                  killVotes,
                  killedIds
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
        actions: this.game.actions
      });
    }
  }

  handleSelectionsChange() {
    if (this.game.isSelections) {
      if (this.master)
        if (this.game.detectAllSelectionsSubmitted()) this.dispatchReveal();

      // Update everyone with who hasnt selected
      this.renderers.selections.renderWaiting({
        players: this.players,
        selections: this.game.selections
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
      selections: new Renderers.Selections(
        this.player,
        {
          dispatchSelection: sel => this.dispatchSelection(sel),
          dispatchEnd: () => this.dispatchEnd()
        },
        true
      ),
      reveal: new Renderers.Reveal(this.player, {
        dispatchActions: () => this.dispatchActions()
      }),
      actions: new Renderers.Actions(this.player, {
        dispatchAction: ids => this.dispatchAction(ids)
      }),
      results: new Renderers.Results(this.player, {
        dispatchEnd: () => this.dispatchEnd(),
        dispatchLeave: () => this.dispatchLeave(),
        dispatchNewRound: () => this.dispatchNewRound()
      })
    };
    this.renderers.start.renderInitial();
    this.renderers.selections.renderInitial();
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
            Adapters.Games.masterUpdateStatus(this.game.id, 'selections');
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

  dispatchSelection(selection) {
    Adapters.Games.globalSelection(this.game.id, this.user.id, selection);
    if (STUB) this.devDispatchSelection();
  }

  devDispatchSelection() {
    if (this.player.isMaster) {
      let topics = new Topics().topics;
      for (let i = 0; i < STUB_COUNT; i++) {
        let id = `${STUB_PREFIX}${i + 1}`;
        let topic = topics[Math.floor(Math.random() * topics.length)][1];
        Adapters.Games.globalSelection(this.game.id, id, topic);
      }
    }
  }

  dispatchAction(playerIds) {
    Adapters.Games.globalAction(this.game.id, this.user.id, playerIds);
    if (STUB) this.devDispatchAction(playerIds);
  }

  devDispatchAction(playerIds) {
    if (this.player.isMaster)
      for (let i = 0; i < STUB_COUNT; i++) {
        let id = `${STUB_PREFIX}${i + 1}`,
          victimIds = [];
        for (let j = 0; j < this.game.imposterCount; j++)
          victimIds.push(
            `${STUB_PREFIX}${Math.ceil(Math.random() * STUB_COUNT)}`
          );
        Adapters.Games.globalAction(this.game.id, id, victimIds);
      }
  }

  // Rendering

  render() {
    let status = this.game.status;
    let map = {
      selections: () =>
        this.renderers.selections.render(this.game, this.players),
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
