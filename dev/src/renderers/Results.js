import Game from '../components/Game';
import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Results extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$header.appendChild(this.$h1);

    this.killed = new List('flex-list flex-list-large');
    this.append(this.$main, this.killed.elements);

    this.$desc = this.el('div');
    this.$main.appendChild(this.$desc);

    this.players = new List();
    this.append(this.$main, this.players.elements);

    this.extra1 = new List();
    this.append(this.$main, this.extra1.elements);

    this.extra2 = new List();
    this.append(this.$main, this.extra2.elements);

    this.$score = this.el('p', null, 'description');
    this.$main.appendChild(this.$score);

    if (this.player._.master) this.renderInitialMaster();
  }

  renderInitialMaster() {
    let $inst = this.el(
        'p',
        'Once everyone is ready, you may proceed below.',
        'instruction'
      ),
      round = new Button({
        content: 'Continue',
        clickEvent: this.events.dispatchNewRound.bind(this)
      }),
      end = new Button({
        content: 'End',
        clickEvent: this.events.dispatchEnd.bind(this)
      });
    this.continue = new Button({
      content: 'Proceed',
      clickEvent: this.events.dispatchTurns.bind(this)
    });
    this.$group = this.el('div', null, 'item-group');
    this.append(this.$group, [round.$el, end.$el]);
    this.append(this.$footer, [$inst, this.$group, this.continue.$el]);
  }

  render({ players, gameData }) {
    let {
      aliveCounts,
      aliveIds,
      deadCounts,
      deadIds,
      roundOver,
      killVotes,
      killedIds
    } = gameData;
    this.killed.reset();
    this.players.reset();
    this.extra1.reset();
    this.extra2.reset();
    this.$score.innerHTML = '';

    this.toggleSections();

    let role = this.player.capitalizedRole;
    this.$h1.innerHTML = `
      <span class="status">Results</span> <span class="info"><span class="throb">${role}</span></span>`;

    let killedVotes = killVotes[killedIds[0]];

    this.killed.title(`
      Killed this Round by ${killedVotes} Vote${killedVotes > 1 ? 's' : ''}`);

    killedIds.forEach(key => {
      this.killed.add(this.userSpan(players[key], 'dead'));
    });

    if (roundOver) {
      this.extra1.title('Imposters');
      this.extra2.title('Standings');
      this.extra2.$ul.classList.add('flex-list-half');
      let winnerText = this._winnerText(aliveCounts),
        roundText = this._roundPointsText(aliveCounts);
      this.$desc.innerHTML = `
        <p class="description">
          ${winnerText} ${this._playerPoints()} ${roundText}
        </p>
      `;
      let playerIds = Object.keys(players);
      playerIds
        .sort((a, b) => {
          let aScore = players[a]._.score,
            bScore = players[b]._.score;
          if (aScore > bScore) return -1;
          if (aScore < bScore) return 1;
          return 0;
        })
        .forEach(playerId => {
          let player = players[playerId],
            score = `<span class="score">${player._.score}</span>`,
            html = `${this.userSpan(player)} ${score}`;
          this.extra2.add(html);
          if (player._.role === 'imposter')
            this.extra1.add(this.userSpan(player));
        });
    } else {
      this.extra1.title('Survivors');
      this.extra2.title('Graveyard');
      this.extra2.$ul.classList.remove('flex-list-half');
      this.$desc.innerHTML = `
        <p class="description">The Round is still in progress. Player roles will stay the same.
        ${this._playerPoints()}</p>
      `;
      for (let playerId in players) {
        let player = players[playerId],
          alive = player._.alive;
        if (alive) {
          this.extra1.add(this.userSpan(player));
        } else {
          this.extra2.add(this.userSpan(player));
        }
      }
    }

    if (this.player._.master) this.renderMaster(roundOver);
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

  _winnerText({ imposter, agent }) {
    let role = this.player._.role;
    if (imposter === 1 && agent === 1) {
      return 'One Imposter and one Agent are left so it is a draw!';
    } else if (imposter > 0) {
      let prefix = role === 'imposter' ? this._success() : this._failure();
      return `${prefix} The <span class="role">Imposters</span> won.`;
    } else if (agent > 0) {
      let prefix = role === 'agent' ? this._success() : this._failure();
      return `${prefix} The <span class="role">Agents</span> won.`;
    }
    return 'Everyone died!';
  }

  _roundPointsText({ imposter, agent }) {
    let addl = this._points(Game.winPoints);
    if (imposter === 1 && agent === 1)
      return 'No one scores additional points.';
    if (imposter > 0) return `Each Imposter scored an additional ${addl}.`;
    if (agent > 0) return `Each Agent scored an additional ${addl}.`;
    return 'No one scores additional points.';
  }

  _playerPoints() {
    let { scoreRound, role, alive } = this.player._,
      scoreTurn = alive ? Game.survivePoints[role] : 0,
      reason = alive ? 'survived' : 'died',
      points = this._points(scoreTurn);
    return `You scored ${points} this Turn because you ${reason},
      and have scored ${this._points(scoreRound)} this Round.`;
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
    return ['dispatchEnd', 'dispatchTurns', 'dispatchNewRound'];
  }
}
