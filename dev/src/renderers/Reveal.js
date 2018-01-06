import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Reveal extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$header.appendChild(this.$h1);

    this.$topics = this.el('p', null, 'topics');
    this.$desc = this.el('p', null, 'description');
    this.$keyMaster = this.el('div', null, 'key-master');

    this.append(this.$main, [this.$topics, this.$desc, this.$keyMaster]);

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
    let { topics, playerCount, turns, keyMasterId } = game;

    if (this.player.id === keyMasterId && turns > 2) {
      this.$keyMaster.innerHTML = `
        <p class="description">You're the <strong>Key Master</strong>.
          Topic of Confusion:</p>
        <p class="topics">“${topics[3][1]}”</p>
        <p class="description warning">
          You can reveal, hide, or even lie about this information.
          Other Players may claim they were confused or that they are the <strong>Key Master</strong>.
          You may not show Players this screen.
        </p>
      `;
    } else if (turns > 2) {
      this.$keyMaster.innerHTML = `
        <p class="description">
          A <strong>Key Master</strong> knew the Topic of Confusion this round.
          You can claim to have been confused by that extra Topic.
          You can also claim to be the <strong>Key Master</strong>. Good luck with that.
        </p>
      `;
    } else {
      this.$keyMaster.innerHTML = '';
    }

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
