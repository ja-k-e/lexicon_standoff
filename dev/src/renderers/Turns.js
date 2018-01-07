import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';
import shuffle from '../utils/shuffle';

export default class Turns extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$topics = this.el('p', null, 'topics');
    this.$desc = this.el('p', null, 'description');

    this.$header.appendChild(this.$h1);
    this.append(this.$main, [this.$topics, this.$desc]);

    if (this.player.isMaster) this.renderInitialMaster();
  }

  renderInitialMaster() {
    let $inst = this.el(
        'p',
        `Take turns saying a word, you first.
        Next time, first turn moves to the next alive Player.
        Proceed once everyone says a word.`,
        'instruction'
      ),
      cancel = new Button({
        content: '◀',
        clickEvent: this.handleConfirmEnd.bind(this),
        classname: 'warning'
      }),
      $grp = this.el('div', null, 'item-group');
    this.proceed = new Button({
      content: 'Proceed',
      clickEvent: this.events.dispatchReveal.bind(this),
      classname: 'flex'
    });
    this.append($grp, [cancel.$el, this.proceed.$el]);
    this.append(this.$footer, [$inst, $grp]);
  }

  render(game, players) {
    let { turns, topics, confusionVotes, playerCount, playerCountAlive } = game;
    topics = topics.map(i => [i[0], i[1].split(' ').join('&nbsp;')]);
    this.$h1.innerHTML = this.roleHeader('Turns');

    if (this.player.isAlive) {
      let descHtml = '',
        topicsHtml;
      if (this.player.isConfused) {
        let confusionVoteCount = confusionVotes[this.player.id],
          confusionPlayers = confusionVoteCount === 1 ? 'Player' : 'Players';
        descHtml += `
          ${confusionVoteCount} dead ${confusionPlayers} confused you with an extra Topic! `;
      }
      if (this.player.isImposter) {
        if (this.player.isConfused)
          topicsHtml = this._shuffledHtml([0, 1, 2, 3], topics);
        else topicsHtml = this._shuffledHtml([0, 1, 2], topics);
      } else {
        if (this.player.isConfused)
          topicsHtml = this._shuffledHtml([0, 1, 3], topics);
        else topicsHtml = this._shuffledHtml([0, 1], topics);
      }
      if (this.player.isConfused || this.player.isImposter) {
        descHtml += `Say one word that you associate with the <strong>two</strong> Agent Topics.`;
      } else {
        descHtml = `Say one word that you associate with both of the Topics above.`;
      }
      this.$topics.innerHTML = topicsHtml;
      this.$desc.innerHTML = descHtml;
    } else {
      this.$topics.innerHTML = this._shuffledHtml([0, 1], topics);
      this.$desc.innerHTML = "You're dead. You don't get a turn.";
    }
    this.toggleSections();
  }

  handleConfirmEnd() {
    if (window.confirm('Are you sure you want to end the game?'))
      this.events.dispatchEnd();
  }

  _shuffledHtml(arr, topics) {
    if (arr.length === 2) {
      return `“${topics[arr[0]][1]}” &amp; “${topics[arr[1]][1]}”`;
    } else {
      let shuffled = shuffle(arr).map(idx => topics[idx][1]);
      let html = '';
      shuffled.forEach((topic, i) => {
        if (i < shuffled.length - 1) html += `“${topic}”, `;
        else html += ` “${topic}”`;
      });
      return html;
    }
  }

  get _name() {
    return 'turns';
  }

  get _eventsList() {
    return ['dispatchReveal', 'dispatchEnd'];
  }
}
