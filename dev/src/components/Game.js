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
    return Object.keys(this.selections).length === this.playerCount;
  }

  calculatePoints(players) {
    let points = {};

    // Alive Imposters score two, alive Agents score one
    for (let playerId in players)
      if (players[playerId].isAlive)
        points[playerId] = Game.survivePoints[players[playerId].role];

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
      topics = this.topicGenerator.loadTopics();
    return {
      game: {
        playerCount,
        inProgress: true,
        actions: {},
        selections: {},
        killVotesByPlayer: {},
        killVotes: {},
        killedIds: [],
        selections: 1,
        imposterCount,
        topics
      },
      players: { playerIdsImposters, playerIdsAgents }
    };
  }

  generateActionIds() {
    let sums = {};
    for (let voterId in this.actions) {
      let voteIds = this.actions[voterId];
      voteIds.forEach(voteId => {
        sums[voteId] = sums[voteId] || 0;
        sums[voteId]++;
      });
    }

    let sorted = Object.keys(sums)
      .sort((a, b) => {
        if (sums[a] > sums[b]) return -1;
        if (sums[a] < sums[b]) return 1;
        return 0;
      })
      .map(a => [a, sums[a]]);

    let imposterCount = this.imposterCount,
      killedIds = [],
      killVotes = {},
      killVotesByPlayer = {};

    pluck();

    function pluck(i = 0) {
      let curr = sorted[i],
        next = sorted[i + 1];
      killedIds.push(curr[0]);
      killVotes[curr[1]] = killVotes[curr[1]] || [];
      killVotes[curr[1]].push(curr[0]);
      killVotesByPlayer[curr[0]] = curr[1];
      let same = next ? curr[1] === next[1] : false,
        remaining = i < sorted.length - 1,
        enough = killedIds.length < imposterCount;
      if (remaining && (enough || same)) pluck(i + 1);
    }

    return { killVotes, killedIds, killVotesByPlayer };
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
  get actions() {
    return this._.actions;
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
  get killVotesByPlayer() {
    return this._.killVotesByPlayer;
  }
  get playerCount() {
    return this._.playerCount;
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
  get selectionStart() {
    return this._.selectionStart;
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
