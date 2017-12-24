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

  detectAllVotesSubmitted() {
    return Object.keys(this._.votes).length === this._.playerCountAlive;
  }

  calculateRoundOverData(players) {
    let deadCounts = { imposter: 0, agent: 0 },
      aliveCounts = { imposter: 0, agent: 0 },
      aliveIds = [],
      deadIds = [];
    for (let playerId in players) {
      let role = players[playerId]._.role;
      if (players[playerId]._.alive) {
        aliveCounts[role]++;
        aliveIds.push(playerId);
      } else {
        deadCounts[role]++;
        deadIds.push(playerId);
      }
    }
    let roundOver =
      aliveCounts.imposter === 0 ||
      aliveCounts.agent === 0 ||
      (aliveCounts.imposter === 1 && aliveCounts.agent === 1);
    return { aliveCounts, aliveIds, deadCounts, deadIds, roundOver };
  }

  calculatePoints(players, { aliveCounts, aliveIds, roundOver }) {
    let points = {};
    if (roundOver) {
      if (aliveCounts.imposter === 1 && aliveCounts.agent === 1) {
        // It is a Draw. No points
      } else if (aliveCounts.imposter > 0) {
        // Imposters score three
        for (let playerId in players)
          if (players[playerId]._.role === 'imposter')
            points[playerId] = Game.winPoints;
      } else if (aliveCounts.agent > 0) {
        // Agents score three
        for (let playerId in players)
          if (players[playerId]._.role === 'agent')
            points[playerId] = Game.winPoints;
      } else {
        // Everyone is dead. No points
      }
    } else {
      // Alive Imposters score two, alive Agents score one
      aliveIds.forEach(playerId => {
        points[playerId] = Game.survivePoints[players[playerId]._.role];
      });
    }
    return points;
  }

  update(values) {
    this.changes = {};
    ['status', 'votes', 'killedIds'].forEach(type => {
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
    this.imposterCount = imposterCount;
    let playerCount = playerIds.length,
      topics = this.generateTopics(),
      playerCountAlive = playerCount,
      votes = {},
      killVotes = {},
      killedIds = [],
      roundOver = false,
      aliveCounts = { imposter: 0, agent: 0 },
      aliveIds = [],
      deadCounts = { imposter: 0, agent: 0 },
      deadIds = [];
    return {
      game: {
        playerCountAlive,
        playerCount,
        votes,
        killVotes,
        killedIds,
        aliveCounts,
        aliveIds,
        deadCounts,
        deadIds,
        imposterCount,
        topics,
        roundOver
      },
      players: { playerIdsImposters, playerIdsAgents }
    };
  }

  generateTopics() {
    return [1, 2, 3, 4].map(_ => this.topicGenerator.loadTopic());
  }

  generateKilledIds() {
    let killVotes = {},
      killedIds = [],
      most = 0;
    for (let playerId in this._.votes) {
      let killedId = this._.votes[playerId];
      killVotes[killedId] = killVotes[killedId] || 0;
      killVotes[killedId]++;
    }
    for (let playerId in killVotes) {
      let votes = killVotes[playerId];
      if (votes > most) {
        most = votes;
        killedIds = [playerId];
      } else if (votes === most) {
        killedIds.push(playerId);
      }
    }
    return { killVotes, killedIds };
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

  // Private

  _distributor(number) {
    // Going for 2 to 1
    let agents = Math.floor(number * 0.66667),
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
