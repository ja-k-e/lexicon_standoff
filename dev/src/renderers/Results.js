import Game from '../components/Game';
import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Results extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$header.appendChild(this.$h1);

    this.$desc = this.el('div');
    this.$main.appendChild(this.$desc);

    this.killed = new List('flex-list flex-list-small');
    this.append(this.$main, this.killed.elements);

    this.imposters = new List('flex-list flex-list-small');
    this.append(this.$main, this.imposters.elements);

    this.$main.appendChild(document.createElement('hr'));

    this.standings = new List('flex-list flex-list-small');
    this.append(this.$main, this.standings.elements);

    this.joined = new List('list-joined flex-list flex-list-small');
    this.append(this.$main, this.joined.elements);

    if (this.player.isMaster) this.renderInitialMaster();
    else this.renderInitialLeave();
  }

  renderInitialMaster() {
    this.$inst = this.el('p', null, 'instruction');
    let round = new Button({
        content: 'Continue',
        clickEvent: this.events.dispatchNewRound.bind(this),
        classname: 'flex'
      }),
      end = new Button({
        content: 'End',
        clickEvent: this.confirmEnd.bind(this),
        classname: 'warning'
      });
    this.$group = this.el('div', null, 'item-group');
    this.append(this.$group, [end.$el, round.$el]);
    this.append(this.$footer, [this.$inst, this.$group]);
  }

  renderInitialLeave() {
    let self = this;
    this.leave = new Button({
      content: 'Leave Game',
      clickEvent: () => this.confirmLeave(),
      classname: 'full warning'
    });
    this.append(this.$footer, [this.leave.$el]);
  }

  confirmEnd() {
    if (window.confirm('Are you sure you want to end the game?'))
      this.events.dispatchEnd();
  }

  confirmLeave() {
    if (window.confirm('Are you sure you want to leave the game?'))
      this.events.dispatchLeave();
  }

  render(game, players, joined) {
    if (this.player.isMaster)
      this.$inst.innerHTML = `
        More Players can join using the code “${game.id}”.
        Once everyone is ready, proceed below.
      `;
    let { killVotesByPlayer, killVotes, killedIds, topics } = game;
    this.killed.reset();
    this.imposters.reset();
    this.standings.reset();
    this.joined.reset();
    this.$section.className = this.$section.className.replace(
      /(win-\d+)|(lose-\d+)/g,
      ''
    );

    if (this.detectJoined(players)) {
      this.joined.title('Joined Players');
      for (let playerId in players) {
        let player = players[playerId];
        if (player.isJoined) {
          this.joined.title('Joined Players');
          this.joined.add(this.userSpan(player));
        }
      }
    }

    this.toggleSections();

    this.$h1.innerHTML = this.roleHeader('Results');

    this.killed.title(`Killed by popular Vote`);
    killedIds.forEach(key => {
      let user = this.userSpan(players[key], 'dead');
      this.killed.add(
        `${user} <span class="votes">${killVotesByPlayer[key]}</span>`
      );
    });

    if (this.leave) this.leave.enable();
    this.imposters.title('Imposters');
    this.standings.title('Standings');
    this.$section.classList.add(this._winLoseClass());
    this.$desc.innerHTML = `
      <p>${this._winnerText()} ${this._playerPoints()}<br>
      The Imposter Topic was “${topics[2].replace(/ /g, '&nbsp;')}”.</p>
    `;
    let sorted = Object.keys(players).sort((a, b) => {
      let aScore = players[a].score,
        bScore = players[b].score;
      if (aScore > bScore) return -1;
      if (aScore < bScore) return 1;
      return 0;
    });
    sorted.forEach((playerId, i) => {
      let player = players[playerId],
        score = `<span class="score">${player.score}</span>`,
        html = `${this.userSpan(player)} ${score}`;
      if (!player.isJoined) {
        this.standings.add(html);
        if (player.isImposter) this.imposters.add(this.userSpan(player));
      }
    });

    if (this.player.isMaster) this.renderMaster();
  }

  renderMaster() {
    this.$group.classList.remove('hide');
  }

  detectJoined(players) {
    let i = 0,
      ids = Object.keys(players),
      joined = false;
    while (i < ids.length && !joined) {
      joined = players[ids[i]].isJoined;
      i++;
    }
    return joined;
  }

  _points(count) {
    return `<span class="points">${count}</span>`;
  }

  _winLoseClass() {
    let win = Math.ceil(Math.random() * 6),
      lose = Math.ceil(Math.random() * 10);
    return this.player.isAlive ? `win-${win}` : `lose-${lose}`;
  }

  _winnerText() {
    if (this.player.isAlive) return this._success();
    else return this._failure();
  }

  _playerPoints() {
    let { role, alive } = this.player._,
      scoreSelection = alive ? Game.survivePoints[role] : 0,
      points = this._points(scoreSelection);
    return `You scored ${points} this Round.`;
  }

  _success() {
    let messages = ['Awesome', 'Radical', 'Great job', 'Wow', 'Kapow'];
    return messages[Math.floor(Math.random() * messages.length)] + '!';
  }

  _failure() {
    let messages = ['Shucks', 'Darn it all', 'Ugh', 'Whelp'];
    return messages[Math.floor(Math.random() * messages.length)] + '!';
  }

  get _name() {
    return 'results';
  }

  get _eventsList() {
    return ['dispatchEnd', 'dispatchNewRound', 'dispatchLeave'];
  }
}
