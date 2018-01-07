import Game from '../components/Game';
import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Results extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$header.appendChild(this.$h1);

    this.killed = new List();
    this.append(this.$main, this.killed.elements);

    this.survivors = new List('flex-list flex-list-small flex-list-quarter');
    this.append(this.$main, this.survivors.elements);

    this.imposters = new List('flex-list flex-list-small flex-list-quarter');
    this.append(this.$main, this.imposters.elements);

    this.$desc = this.el('div');
    this.$main.appendChild(this.$desc);

    this.extra2 = new List('flex-list flex-list-small');
    this.append(this.$main, this.extra2.elements);

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
    this.continue = new Button({
      content: 'Proceed',
      clickEvent: this.events.dispatchSelections.bind(this),
      classname: 'full'
    });
    this.$group = this.el('div', null, 'item-group');
    this.append(this.$group, [end.$el, round.$el]);
    this.append(this.$footer, [$inst, this.$group, this.continue.$el]);
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
    let {
      aliveCounts,
      aliveIds,
      deadCounts,
      deadIds,
      roundOver,
      killVotes,
      killedIds
    } = game;
    this.killed.reset();
    this.survivors.reset();
    this.imposters.reset();
    this.extra2.reset();
    this.$score.innerHTML = '';
    this.$section.className = this.$section.className.replace(
      /(win-\d+)|(lose-\d+)/g,
      ''
    );

    this.toggleSections();

    this.$h1.innerHTML = this.roleHeader('Results');

    let killedVotes = killVotes[killedIds[0]],
      voteS = killedVotes === 1 ? 'Vote' : 'Votes';
    this.killed.title(`Killed this Round by ${killedVotes} ${voteS}`);
    killedIds.forEach(key => {
      this.killed.add(this.userSpan(players[key], 'dead'));
    });

    this.survivors.title('Survivors');
    if (roundOver) {
      if (this.leave) this.leave.enable();
      this.imposters.title('Imposters');
      this.extra2.title('Standings');
      let winClass = this._winLoseClass(aliveCounts),
        winnerText = this._winnerText(aliveCounts),
        roundText = this._roundPointsText(aliveCounts);
      this.$section.classList.add(winClass);
      this.$desc.innerHTML = `
        <p class="description">
          ${winnerText} ${this._playerPoints(true)} ${roundText}
        </p>
      `;
      let survivors = false,
        playerIds = Object.keys(players);
      playerIds
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
          this.extra2.add(html);
          if (player.isImposter) this.imposters.add(this.userSpan(player));
          if (player.isAlive) {
            this.survivors.add(this.userSpan(player));
            survivors = true;
          }
        });
      if (!survivors)
        this.survivors.$ul.innerHTML = '<li class="empty">None</li>';
    } else {
      if (this.leave) this.leave.disable();
      this.extra2.title('Graveyard');
      this.extra2.$ul.classList.remove('flex-list-half');
      this.$desc.innerHTML = `
        <p class="description">${this._playerPoints(false)}
          The Round is in progress, roles stay the same.</p>
      `;
      for (let playerId in players) {
        let player = players[playerId],
          alive = player.isAlive;
        if (alive) {
          this.survivors.add(this.userSpan(player));
        } else {
          this.extra2.add(this.userSpan(player, 'dead'));
        }
      }
    }

    if (this.player.isMaster) this.renderMaster(roundOver);
  }

  renderMaster(roundOver) {
    if (roundOver) {
      this.continue.$el.classList.add('hide');
      this.$group.classList.remove('hide');
    } else {
      this.continue.$el.classList.remove('hide');
      this.$group.classList.add('hide');
    }
  }

  _points(count) {
    return `<span class="points">${count}</span>`;
  }

  _winLoseClass({ imposter, agent }) {
    let win = Math.ceil(Math.random() * 6),
      lose = Math.ceil(Math.random() * 10),
      role = this.player.role;
    if (imposter > 0) {
      return role === 'imposter' ? `win-${win}` : `lose-${lose}`;
    } else if (agent > 0) {
      return role === 'agent' ? `win-${win}` : `lose-${lose}`;
    }
    return `lose-${lose}`;
  }

  _winnerText({ imposter, agent }) {
    let role = this.player.capitalizedRole;
    if (imposter > 0) {
      let prefix = this.player.isImposter ? this._success() : this._failure(),
        wonLost = this.player.isImposter ? 'won' : 'lost';
      return `${prefix} The <span class="role">${role}s</span> ${wonLost}.`;
    } else if (agent > 0) {
      let prefix = this.player.isAgent ? this._success() : this._failure(),
        wonLost = this.player.isAgent ? 'won' : 'lost';
      return `${prefix} The <span class="role">${role}s</span> ${wonLost}.`;
    }
    return 'Everyone died!';
  }

  _roundPointsText({ imposter, agent }) {
    let addl = this._points(Game.winPoints);
    if (imposter > 0) return `Each Imposter scored an additional ${addl}.`;
    if (agent > 0) return `Each Agent scored an additional ${addl}.`;
    return 'No one scored additional points.';
  }

  _playerPoints(roundOver) {
    let { scoreRound, role, alive } = this.player._,
      scoreSelection = alive ? Game.survivePoints[role] : 0,
      points = this._points(scoreSelection),
      extra = roundOver ? 'in total' : 'so far';
    if (alive)
      return `You scored ${points} this Selection,
        and ${this._points(scoreRound)} ${extra} this Round.`;
    else
      return `You are dead and scored ${this._points(
        scoreRound
      )} ${extra} this Round.`;
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
    return [
      'dispatchEnd',
      'dispatchSelections',
      'dispatchNewRound',
      'dispatchLeave'
    ];
  }
}
