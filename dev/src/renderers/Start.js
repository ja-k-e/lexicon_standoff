import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Start extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1', 'Waiting for Players...');
    this.$header.appendChild(this.$h1);

    this.$secretLabel = this.el('p', 'Game Secret', 'label');
    this.$secret = this.el('p', null, 'secret');
    this.append(this.$main, [this.$secretLabel, this.$secret]);

    this.players = new List('flex-list flex-list-small flex-list-quarter');
    this.append(this.$main, this.players.elements);

    this.$roles = this.el('p', null, 'description');
    this.$main.appendChild(this.$roles);

    if (this.player._.master) {
      let $inst = this.el(
        'p',
        'Once everyone is here, start the game. Players can join this Game using the Game Secret above.',
        'instruction'
      );
      let $group = this.el('div', null, 'item-group');
      let cancel = new Button({
        content: 'Cancel',
        clickEvent: this.events.dispatchEnd.bind(this)
      });
      this.start = new Button({
        content: 'Start',
        clickEvent: this.events.dispatchStart.bind(this)
      });
      this.append($group, [cancel.$el, this.start.$el]);
      this.append(this.$footer, [$inst, $group]);
    }
  }

  render({ players, gameId }) {
    this.players.reset();
    let playerCount = Object.keys(players).length,
      roles = this._distributor(playerCount),
      remain = 3 - playerCount,
      waiting = remain > 0,
      playerS = remain > 1 ? 'Players' : 'Player';
    this.players.title(
      waiting ? `Need at least ${remain} more ${playerS}` : ''
    );
    if (waiting) {
      this.$roles.innerHTML = '';
    } else {
      let imposterS = roles[1] === 1 ? 'Imposter' : 'Imposters';
      this.$roles.innerHTML = `There will be ${roles[0]} Agents and ${roles[1]} ${imposterS}.`;
    }

    if (this.player._.master && this.start) {
      if (waiting) this.start.disable();
      else this.start.enable();
    }
    this.$secret.innerHTML = `“${gameId}”`;
    this.toggleSections();
    for (let playerId in players) {
      let { avatar, name } = players[playerId];
      let you = playerId === this.player.id ? 'you' : '';
      let html = `<span class="user ${you}"><img src="${avatar}" /> <span>${name}</span></span>`;
      this.players.add(html);
    }
  }

  _distributor(number) {
    // Going for 2 to 1
    let agents = Math.floor(number * 0.66667),
      imposters = number - agents;
    return [agents, imposters];
  }

  get _name() {
    return 'start';
  }

  get _eventsList() {
    return ['dispatchStart', 'dispatchEnd'];
  }
}
