import Adapters from '../adapters/Adapters';
import Topics from '../generators/Topics';
import shuffle from '../utils/shuffle';

export default class Game {
  constructor({ state }) {
    this.state = state;
    this.id = state.gameId;
    this.playerId = state.playerId;
    this._ = {};
    this.topicGenerator = new Topics();
  }

  detectAllActionsSubmitted() {
    return Object.keys(this.actions).length === this.playerCount;
  }
  detectAllSelectionsSubmitted() {
    return Object.keys(this.selections).length === this.playerCountAlive;
  }

  calculateRoundOverData(players) {
    let deadCounts = { imposter: 0, agent: 0 },
      aliveCounts = { imposter: 0, agent: 0 },
      aliveIds = [],
      deadIds = [];
    for (let playerId in players) {
      let role = players[playerId].role;
      if (players[playerId].isAlive) {
        aliveCounts[role]++;
        aliveIds.push(playerId);
      } else {
        deadCounts[role]++;
        deadIds.push(playerId);
      }
    }
    let roundOver = aliveCounts.imposter === 0 || aliveCounts.agent === 0;
    return { aliveCounts, aliveIds, deadCounts, deadIds, roundOver };
  }

  calculatePoints(players, { aliveCounts, aliveIds, roundOver }) {
    let points = {},
      winRole = null;
    if (roundOver) {
      if (aliveCounts.imposter > 0) winRole = 'imposter';
      else if (aliveCounts.agent > 0) winRole = 'agent';
    }
    // Alive Imposters score two, alive Agents score one
    for (let playerId in players) {
      let player = players[playerId],
        role = player.role,
        survivePts = Game.survivePoints[role];
      // If winning Team
      if (winRole && winRole === role) {
        // If alive, extra points
        let pts = player.isAlive ? Game.winPoints + survivePts : Game.winPoints;
        points[playerId] = pts;
      } else if (winRole) {
        // If Loser,
      } else {
        // Game Still playing
        if (player.isAlive) points[playerId] = survivePts;
      }
    }
    return points;
  }

  update(values) {
    this.changes = {};
    ['status', 'actions', 'selections', 'killedIds'].forEach(type => {
      this.changes[type] = values[type] !== this._[type];
    });
    this._ = values;
  }

  // Generators

  generateRoundData() {
    let playerIds = Object.keys(this.state.players);
    let {
      playerIdsImposters,
      playerIdsAgents,
      imposterCount
    } = this._generateRoles(playerIds);
    let playerCount = playerIds.length,
      topics = this.generateTopics();
    return {
      game: {
        playerCountAlive: playerCount,
        playerCount,
        inProgress: true,
        actions: {},
        selections: {},
        killVotes: {},
        killedIds: [],
        aliveCounts: { imposter: 0, agent: 0 },
        aliveIds: [],
        deadCounts: { imposter: 0, agent: 0 },
        deadIds: [],
        selections: 1,
        imposterCount,
        topics,
        roundOver: false
      },
      players: { playerIdsImposters, playerIdsAgents }
    };
  }

  generateTopics() {
    return [1, 2, 3, 4].map(_ => this.topicGenerator.loadTopic());
  }

  generateActionIds() {
    let killVotes = {},
      killedIds = [],
      confusionVotes = {},
      confusionIds = [],
      most = 0;
    for (let playerId in this.actions) {
      let actionId = this.actions[playerId],
        lastVote = this.playerCountAlive === 2,
        aliveAction = this.state.players[playerId].isAlive;
      if (aliveAction || lastVote) {
        killVotes[actionId] = killVotes[actionId] || 0;
        killVotes[actionId]++;
      } else {
        confusionVotes[actionId] = confusionVotes[actionId] || 0;
        confusionVotes[actionId]++;
      }
    }
    for (let playerId in killVotes) {
      let actions = killVotes[playerId];
      if (actions > most) {
        most = actions;
        killedIds = [playerId];
      } else if (actions === most) {
        killedIds.push(playerId);
      }
    }
    for (let playerId in confusionVotes) {
      let actions = confusionVotes[playerId];
      confusionIds.push(playerId);
    }
    return { confusionVotes, confusionIds, killVotes, killedIds };
  }

  // Generators

  _generateRoles(playerIds) {
    let ids = shuffle(Array.from(playerIds)),
      counts = this._distributor(playerIds.length),
      agentCount = counts[0],
      imposterCount = counts[1];
    let playerIdsAgents = ids.slice(0, agentCount);
    ids = ids.slice(agentCount);
    let playerIdsImposters = ids;
    return {
      playerIdsImposters,
      playerIdsAgents,
      imposterCount
    };
  }

  // Getters
  get aliveCounts() {
    return this._.aliveCounts;
  }
  get aliveIds() {
    return this._.aliveIds;
  }
  get confusionVotes() {
    return this._.confusionVotes;
  }
  get deadCounts() {
    return this._.deadCounts;
  }
  get deadIds() {
    return this._.deadIds;
  }
  get imposterCount() {
    return this._.imposterCount;
  }
  get killedIds() {
    return this._.killedIds;
  }
  get killVotes() {
    return this._.killVotes;
  }
  get playerCount() {
    return this._.playerCount;
  }
  get playerCountAlive() {
    return this._.playerCountAlive;
  }
  get roundOver() {
    return this._.roundOver;
  }
  get selections() {
    return this._.selections;
  }
  get status() {
    return this._.status;
  }
  get topics() {
    return this._.topics;
  }
  get selections() {
    return this._.selections;
  }
  get actions() {
    return this._.actions;
  }
  get isActions() {
    return this.status === 'actions';
  }
  get isSelections() {
    return this.status === 'selections';
  }

  // Private

  _distributor(number) {
    // Going for 3 to 1, minimum 1
    let agents = Math.max(Math.floor(number * 0.75), 1),
      imposters = number - agents;
    return [agents, imposters];
  }

  get _ref() {
    return `/games/${this.id}`;
  }

  get _playersRef() {
    return `/players/${this.id}`;
  }

  // Class

  static get survivePoints() {
    return { agent: 1, imposter: 2 };
  }

  static get winPoints() {
    return 3;
  }
}
