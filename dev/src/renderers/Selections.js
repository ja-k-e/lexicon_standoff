import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';
import shuffle from '../utils/shuffle';

export default class Selections extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$topics = this.el('p', null, 'topics');
    this.$desc = this.el('p', null, 'description');
    this.$input = this.el('input', null, 'full margin');
    this.$input.setAttribute('type', 'text');
    this.$input.setAttribute('placeholder', 'Word or Name');
    this.$input.setAttribute('maxlength', '16');

    this.$header.appendChild(this.$h1);
    this.append(this.$main, [this.$topics, this.$desc, this.$input]);

    this.waiting = new List('flex-list flex-list-small flex-list-quarter');
    this.append(this.$main, this.waiting.elements);

    let $inst = this.el(
        'p',
        `Enter your choice above then submit it below.`,
        'instruction'
      ),
      $grp = this.el('div', null, 'item-group');
    this.submit = new Button({
      content: 'Submit',
      clickEvent: this.handleSubmit.bind(this),
      classname: 'flex'
    });
    if (this.player.isMaster) {
      let cancel = new Button({
        content: '◀',
        clickEvent: this.handleConfirmEnd.bind(this),
        classname: 'warning'
      });
      $grp.appendChild(cancel.$el);
    }
    this.append($grp, [this.submit.$el]);
    this.append(this.$footer, [$inst, $grp]);
  }

  handleSubmit() {
    let selection = this.$input.value;
    if (selection.replace(/ /g, '').length > 0) {
      this.events.dispatchSelection(selection);
      this.$input.classList.add('hide');
      this.submit.disable();
    } else {
      alert(`"${selection}" is not valid. Try again.`);
    }
  }

  render(game, players) {
    this.topics = game.topics.map(t => t[1]);
    this.$input.value = '';
    let { topics, selections, playerCount } = game;
    topics = topics.map(i => [i[0], i[1].split(' ').join('&nbsp;')]);
    this.$h1.innerHTML = this.roleHeader('Selections');

    if (selections[this.player.id]) {
      this.$input.classList.add('hide');
      this.submit.disable();
    } else {
      this.$input.classList.remove('hide');
      this.submit.enable();
    }
    let descHtml = '',
      topicsHtml;
    if (this.player.isImposter)
      topicsHtml = this._shuffledHtml([0, 1, 2], topics);
    else topicsHtml = this._shuffledHtml([0, 1], topics);
    if (this.player.isImposter) {
      descHtml += `Enter one word or name below that you associate with the <strong>two</strong> Agent Topics.`;
    } else {
      descHtml = `Enter one word or name below that you associate with both of the Topics above.`;
    }
    this.$topics.innerHTML = topicsHtml;
    this.$desc.innerHTML = descHtml;
    this.toggleSections();
    this.renderWaiting({ players, selections });
  }

  renderWaiting({ players, selections }) {
    this.waiting.reset();
    this.waiting.title('Waiting on...');
    for (let playerId in players)
      if (!selections || !selections[playerId])
        if (players[playerId].isAlive)
          this.waiting.add(this.userSpan(players[playerId]));
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
    return 'selections';
  }

  get _eventsList() {
    return ['dispatchSelection', 'dispatchEnd'];
  }
}
