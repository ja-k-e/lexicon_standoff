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

    this.players = new List();
    this.append(this.$main, this.players.elements);

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
    let playerCount = Object.keys(players).length;
    let remain = 3 - playerCount,
      waiting = remain > 0,
      playerS = remain > 1 ? 'Players' : 'Player';
    this.players.title(
      waiting ? `Need at least ${remain} more ${playerS}` : ''
    );
    if (this.player._.master && this.start) {
      if (waiting) this.start.disable();
      else this.start.enable();
    }
    this.$secret.innerHTML = `“${gameId}”`;
    this.toggleSections();
    for (let playerId in players) {
      let { image, name } = players[playerId];
      let you = playerId === this.player.id ? 'you' : '';
      let html = `<span class="user ${you}"><img src="${image}" /> <span>${name}</span></span>`;
      this.players.add(html);
    }
  }

  get _name() {
    return 'start';
  }

  get _eventsList() {
    return ['dispatchStart', 'dispatchEnd'];
  }
}
