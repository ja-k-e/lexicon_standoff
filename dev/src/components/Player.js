export default class Player {
  constructor(state, { id, gameId, name, avatar, master }) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.gameId = gameId;
    this.state = state;
    this._ = {};
  }

  update(values) {
    this._ = values;
  }

  get score() {
    return this._.score;
  }
  get scoreRound() {
    return this._.scoreRound;
  }
  get role() {
    return this._.role;
  }
  get isAgent() {
    return this.role === 'agent';
  }
  get isImposter() {
    return !this.isAgent;
  }
  get isAlive() {
    return this._.alive;
  }
  get isDead() {
    return !this.isAlive;
  }
  get isMaster() {
    return this._.master;
  }
  get isConfused() {
    return this._.confused;
  }

  get capitalizedRole() {
    return this._.role.charAt(0).toUpperCase() + this._.role.slice(1);
  }

  get key() {
    return `${this.gameId}/${this.id}`;
  }

  get _ref() {
    return `/players/${this.key}`;
  }
}
