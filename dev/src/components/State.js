const config = require('config');

import Adapters from '../adapters/Adapters';
import Renderers from '../renderers/Renderers';
import Game from './Game';
import Player from './Player';

const //
  STUB = config.env === 'development',
  STUB_COUNT = 14,
  STUB_PREFIX = 'TEST_USER_';

export default class State {
  constructor({ user }) {
    this.user = user;
    this.initializeLaunch();
    this.initialize();
  }

  initializeLaunch() {
    this.launch = new Renderers.Launch(null, {
      createGame: this.createGame.bind(this),
      findGame: this.findGame.bind(this)
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

  // Handlers

  handleGameChanges() {
    if (this.game.changes.status) this.handleStatusChange();
    if (this.game.changes.votes) this.handleActionsChange();
    if (this.master) {
      if (this.game._.status === 'actions' && this.game.changes.killedIds)
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
    if (this.game._.status === 'actions') {
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
                this.game._.playerCountAlive - killedIds.length;
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
        votes: this.game._.votes
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
    let topics = this.game.generateTopics();
    Adapters.Games.masterResetRound(this.game.id, topics).then(() => {
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

  dispatchAction(playerId) {
    Adapters.Games.globalVote(this.game.id, this.user.id, playerId);
    if (STUB) this.devDispatchAction(playerId);
  }

  devDispatchAction(playerId) {
    let spoofs = this.game._.playerCount - STUB_COUNT;
    if (this.player._.master)
      for (let i = 0; i < this.game._.playerCount - 2; i++) {
        let id = `${STUB_PREFIX}${i + 1}`,
          victimId = this.players[id]._.alive ? playerId : this.player.id;
        Adapters.Games.globalVote(this.game.id, id, victimId);
      }
  }

  // Rendering

  render() {
    let status = this.game._.status;
    let map = {
      turns: () => this.renderers.turns.render(this.game._),
      reveal: () => this.renderers.reveal.render(this.game._, this.players),
      actions: () =>
        this.renderers.actions.render({
          players: this.players,
          imposterCount: this.game._.imposterCount,
          votes: this.game._.votes
        }),
      results: () =>
        this.renderers.results.render({
          players: this.players,
          gameData: this.game._
        })
    };
    return map[status] ? map[status]() : null;
  }

  get player() {
    return this.players[this.playerId];
  }

  // Private

  _devCreateStubbedPlayers(gameId) {
    let image =
      'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
    for (let i = 0; i < STUB_COUNT; i++) {
      Adapters.Players.globalCreate(
        gameId,
        {
          id: `${STUB_PREFIX}${i + 1}`,
          name: `Player${i + 1}`,
          image
        },
        false
      );
    }
  }
}
