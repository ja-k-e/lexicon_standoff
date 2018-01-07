import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Reveal extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$header.appendChild(this.$h1);

    this.$topics = this.el('p', null, 'topics');
    this.$desc = this.el('p', null, 'description');

    this.append(this.$main, [this.$topics, this.$desc]);

    this.selections = new List(
      'flex-list flex-list-small flex-list-selections'
    );
    this.selections.title('Selections');
    this.append(this.$main, this.selections.elements);

    if (this.player.isMaster) {
      let $inst = this.el(
        'p',
        `Players question each other and discuss who they think is an Imposter.
          Once everyone is ready to vote, proceed.`,
        'instruction'
      );
      let $grp = this.el('div', null, 'item-group'),
        back = new Button({
          content: '◀',
          clickEvent: this.events.back.bind(this)
        }),
        proceed = new Button({
          content: 'Proceed',
          clickEvent: this.events.dispatchActions.bind(this),
          classname: 'flex'
        });
      this.append($grp, [back.$el, proceed.$el]);
      this.append(this.$footer, [$inst, $grp]);
    }
  }

  render(game, players) {
    let { topics, playerCount, selections } = game;

    this.selections.reset();
    for (let playerId in selections)
      this.selections.add(`
        ${this.userSpan(players[playerId])}
        <span class="selection">${selections[playerId]}</span>
      `);

    this.$h1.innerHTML = this.roleHeader('Reveal');
    this.$topics.innerHTML = `“${topics[0][1]}” &amp; “${topics[1][1]}”`;
    if (this.player.isAlive) {
      this.$desc.innerHTML = `These were the two Topics. Explain why you chose your word.`;
    } else {
      this.$desc.innerHTML = 'You are dead. You can still question Players.';
    }
    this.toggleSections();
  }

  get _name() {
    return 'reveal';
  }

  get _eventsList() {
    return ['dispatchActions', 'back'];
  }
}
