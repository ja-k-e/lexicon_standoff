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

    this.imposters = new List('flex-list flex-list-small flex-list-quarter');
    this.append(this.$main, this.imposters.elements);

    this.standings = new List('flex-list flex-list-small');
    this.append(this.$main, this.standings.elements);

    this.$score = this.el('p', null, 'description');
    this.$main.appendChild(this.$score);

    if (this.player.isMaster) this.renderInitialMaster();
    else this.renderInitialLeave();
  }

  renderInitialMaster() {
    let $inst = this.el(
        'p',
        'Once everyone is ready, proceed below.',
        'instruction'
      ),
      round = new Button({
        content: 'Continue',
        clickEvent: this.events.dispatchNewRound.bind(this),
        classname: 'flex'
      }),
      end = new Button({
        content: '◀',
        clickEvent: this.confirmEnd.bind(this),
        classname: 'warning'
      });
    this.$group = this.el('div', null, 'item-group');
    this.append(this.$group, [end.$el, round.$el]);
    this.append(this.$footer, [$inst, this.$group]);
  }

  renderInitialLeave() {
    let self = this;
    this.leave = new Button({
      content: 'Leave Game',
      clickEvent: () => this.confirmLeave(),
      classname: 'full'
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

  render(game, players) {
    let { killVotesByPlayer, killVotes, killedIds } = game;
    this.killed.reset();
    this.imposters.reset();
    this.standings.reset();
    this.$score.innerHTML = '';
    this.$section.className = this.$section.className.replace(
      /(win-\d+)|(lose-\d+)/g,
      ''
    );

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
    let winClass = this._winLoseClass(),
      winnerText = this._winnerText();
    this.$section.classList.add(winClass);
    this.$desc.innerHTML = `
      <p class="description">${winnerText} ${this._playerPoints()}</p>
    `;
    Object.keys(players)
      .sort((a, b) => {
        let aScore = players[a].score,
          bScore = players[b].score;
        if (aScore > bScore) return -1;
        if (aScore < bScore) return 1;
        return 0;
      })
      .forEach(playerId => {
        let player = players[playerId],
          score = `<span class="score">${player.score}</span>`,
          html = `${this.userSpan(player)} ${score}`;
        this.standings.add(html);
        if (player.isImposter) this.imposters.add(this.userSpan(player));
      });

    if (this.player.isMaster) this.renderMaster();
  }

  renderMaster() {
    this.$group.classList.remove('hide');
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
    if (this.player.isAlive) return `${this._success()} You stayed Alive.`;
    else return `${this._failure()} You died.`;
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
