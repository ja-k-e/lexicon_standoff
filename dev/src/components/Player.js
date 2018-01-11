export default class Player {
  constructor(state, player) {
    this.state = state;
    this._ = player;
  }

  update(values) {
    this._ = values;
  }

  get avatar() {
    return this._.avatar;
  }
  get gameId() {
    return this._.gameId;
  }
  get id() {
    return this._.id;
  }
  get name() {
    return this._.name;
  }
  get role() {
    return this._.role;
  }
  get score() {
    return this._.score;
  }
  get isAgent() {
    return this.role === 'agent';
  }
  get isImposter() {
    return this.role === 'imposter';
  }
  get isJoined() {
    return this.role === 'joined';
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

  get capitalizedRole() {
    let safeRole = this._.role || '';
    return safeRole.charAt(0).toUpperCase() + safeRole.slice(1);
  }

  get key() {
    return `${this.gameId}/${this.id}`;
  }

  get _ref() {
    return `/players/${this.key}`;
  }
}
