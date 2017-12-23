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
    let deadCounts = { impostor: 0, agent: 0 },
      aliveCounts = { impostor: 0, agent: 0 },
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
      aliveCounts.impostor === 0 ||
      aliveCounts.agent === 0 ||
      (aliveCounts.impostor === 1 && aliveCounts.agent === 1);
    return { aliveCounts, aliveIds, deadCounts, deadIds, roundOver };
  }

  calculatePoints(players, { aliveCounts, aliveIds, roundOver }) {
    let points = {};
    if (roundOver) {
      if (aliveCounts.impostor === 1 && aliveCounts.agent === 1) {
        // It is a Draw. No points
      } else if (aliveCounts.impostor > 0) {
        // Impostors score three
        for (let playerId in players)
          if (players[playerId]._.role === 'impostor')
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
      // Alive Impostors score two, alive Agents score one
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
      playerIdsImpostors,
      playerIdsAgents,
      impostorCount
    } = this._generateRoles(playerIds);
    this.impostorCount = impostorCount;
    let playerCount = playerIds.length,
      topics = this.generateTopics(),
      playerCountAlive = playerCount,
      votes = {},
      killVotes = {},
      killedIds = [],
      roundOver = false,
      aliveCounts = { impostor: 0, agent: 0 },
      aliveIds = [],
      deadCounts = { impostor: 0, agent: 0 },
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
        impostorCount,
        topics,
        roundOver
      },
      players: { playerIdsImpostors, playerIdsAgents }
    };
  }

  generateTopics() {
    return [this.topicGenerator.loadTopic(), this.topicGenerator.loadTopic()];
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
      impostorCount = counts[1];
    let playerIdsAgents = ids.slice(0, agentCount);
    ids = ids.slice(agentCount);
    let playerIdsImpostors = ids;
    return {
      playerIdsImpostors,
      playerIdsAgents,
      impostorCount
    };
  }

  // Private

  _distributor(number) {
    // Going for 2 to 1
    let agents = Math.floor(number * 0.66667),
      impostors = number - agents;
    return [agents, impostors];
  }

  get _ref() {
    return `/games/${this.id}`;
  }

  get _playersRef() {
    return `/players/${this.id}`;
  }

  // Class

  static get survivePoints() {
    return { agent: 1, impostor: 2 };
  }

  static get winPoints() {
    return 3;
  }
}
