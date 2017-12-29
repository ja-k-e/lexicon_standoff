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

    this.imposters = new List('flex-list flex-list-small flex-list-quarter');
    this.append(this.$main, this.imposters.elements);

    if (this.player.isMaster) {
      let $inst = this.el(
        'p',
        `Players question each other and discuss who they think is an Imposter.
          Once everyone is ready to vote, proceed.`,
        'instruction'
      );
      let proceed = new Button({
        content: 'Proceed',
        clickEvent: this.events.dispatchActions.bind(this)
      });
      this.append(this.$footer, [$inst, proceed.$el]);
    }
  }

  render(game, players) {
    let { topics, playerCount } = game;

    this.imposters.reset();
    if (this.player.isDead || (playerCount > 4 && this.player.isImposter))
      this.renderImposters(players);

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
    return ['dispatchActions'];
  }
}
