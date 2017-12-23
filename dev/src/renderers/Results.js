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

    this.killed = new List();
    this.append(this.$main, this.killed.elements);

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
      this.extra1.title('Impostors');
      this.extra2.title('Standings');
      this.extra2.$ul.classList.add('flex-list-half');
      let winnerText = this._winnerText(aliveCounts);
      this.$desc.innerHTML = `
        <p class="description">${winnerText}</p>
        <p class="description">${this._roundPointsText(aliveCounts)}</p>
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
          if (player._.role === 'impostor')
            this.extra1.add(this.userSpan(player));
        });
    } else {
      this.extra1.title('Survivors');
      this.extra2.title('Graveyard');
      this.extra2.$ul.classList.remove('flex-list-half');
      this.$desc.innerHTML = `
        <p class="description">The Round is still in progress. Player roles will be maintained.</p>
        <p class="description">${this._playerPoints()}</p>
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
    let pointS = count === 1 ? 'point' : 'points';
    return `<span class="points">${count} ${pointS}</span>`;
  }

  _winnerText({ imposter, agent }) {
    if (imposter > 0) return 'The <span class="role">Impostors</span> won!';
    if (agent > 0) return 'The <span class="role">Agents</span> won!';
    return 'It was a draw!';
  }

  _roundPointsText({ imposter, agent }) {
    if (imposter > 0)
      return `All Impostors receive ${this._points(Game.survivePoints)}.`;
    if (agent > 0)
      return `All Agents receive ${this._points(Game.survivePoints)}.`;
    return 'No one receives additional points.';
  }

  _playerPoints() {
    let { scoreRound, role, alive } = this.player._,
      scoreTurn = alive ? Game[`${role}Points`] : 0,
      reason = alive ? 'survived' : 'died';
    return `You received ${this._points(
      scoreTurn
    )} this Turn because you ${reason}
      and have scored ${this._points(scoreRound)} this Round.`;
  }

  get _name() {
    return 'results';
  }

  get _eventsList() {
    return ['dispatchEnd', 'dispatchTurns', 'dispatchNewRound'];
  }
}
