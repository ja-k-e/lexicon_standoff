import Renderer from './Renderer';
import Button from './modules/Button';

export default class Turns extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$topics = this.el('p', null, 'topics');
    this.$desc = this.el('p', null, 'description');
    this.$header.appendChild(this.$h1);
    this.append(this.$main, [this.$topics, this.$desc]);

    if (this.player._.master) this.renderInitialMaster();
  }

  renderInitialMaster() {
    let $inst = this.el(
      'p',
      `Take clockwise turns saying a word. You're first in round one.
        After a round, the first turn moves clockwise to the next alive Player.
        Once everyone says a word, proceed.`,
      'instruction'
    );
    this.proceed = new Button({
      content: 'Proceed',
      clickEvent: this.events.dispatchReveal.bind(this)
    });
    this.append(this.$footer, [$inst, this.proceed.$el]);
  }

  render({ topics }) {
    let role = this.player.capitalizedRole;
    this.$h1.innerHTML = `
      <span class="status">Turns</span> <span class="info"><span class="throb">${role}</span></span>`;
    if (this.player._.alive) {
      let descHtml, topicsHtml;
      if (this.player._.role === 'impostor') {
        descHtml = `On your turn, say one word that you associate with this Topic. Be abstract.`;
        topicsHtml = topics[0];
      } else {
        let first = Math.round(Math.random()),
          last = first === 0 ? 1 : 0;
        descHtml = `On your turn, say one word that you associate with both of the Topics above.`;
        topicsHtml = `${topics[first]} &amp; ${topics[last]}`;
      }
      this.$topics.innerHTML = topicsHtml;
      this.$desc.innerHTML = descHtml;
    } else {
      this.$topics.innerHTML = '';
      this.renderDead(this.$desc);
    }
    this.toggleSections();
  }

  get _name() {
    return 'turns';
  }

  get _eventsList() {
    return ['dispatchReveal'];
  }
}
