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

    this.imposters = new List();
    this.append(this.$main, this.imposters.elements);

    if (this.player._.master) {
      let $inst = this.el(
        'p',
        `Players question each other's word selections and discuss who they think is an Imposter.
          Once everyone is ready to vote, proceed.`,
        'instruction'
      );
      let proceed = new Button({
        content: 'Proceed',
        clickEvent: this.events.dispatchVotes.bind(this)
      });
      this.append(this.$footer, [$inst, proceed.$el]);
    }
  }

  render({ topics }, players) {
    this.imposters.reset();
    let role = this.player.capitalizedRole;
    this.$h1.innerHTML = `
      <span class="status">Reveal</span> <span class="info"><span class="throb">${role}</span></span>`;
    this.$topics.innerHTML = `“${topics[0][1]}” &amp; “${topics[1][1]}”`;
    if (this.player._.alive) {
      this.$desc.innerHTML = `These were the two Topics. Explain why you chose your word.`;
      if (this.player._.role === 'imposter') {
        this.imposters.title('Other Imposters');
        for (let playerId in players) {
          let player = players[playerId];
          if (player._.role === 'imposter' && playerId !== this.player.id) {
            let classname = player._.alive ? '' : 'dead';
            this.imposters.add(this.userSpan(player, classname));
          }
        }
      }
    } else {
      this.renderDead(this.$desc);
    }
    this.toggleSections();
  }

  get _name() {
    return 'reveal';
  }

  get _eventsList() {
    return ['dispatchVotes'];
  }
}
