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
      classname: 'flex',
      submit: true
    });
    if (this.player.isMaster) {
      let cancel = new Button({
        content: 'End',
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
    selection = selection.replace(/[^\w ]/g, '').toLowerCase();
    if (selection.match(/\d/)) {
      alert('Letters only.');
    } else if (this.matchesTopic(selection)) {
      alert(
        "You can't submit one of the Topics, dummy. This is a game. Play it."
      );
    } else if (selection.replace(/ /g, '').length > 0) {
      this.$input.blur();
      this.events.dispatchSelection(selection);
      this.$input.classList.add('hide');
      this.submit.disable();
    } else {
      alert("C'mon. You gotta submit something.");
    }
  }

  matchesTopic(selection) {
    let topics = this.player.isImposter
      ? this.topics
      : [this.topics[0], this.topics[1]];
    let clean = selection.replace(/[^\w]/g, ''),
      arr = topics.map(t => t[1].toLowerCase().replace(/[^\w]/g, ''));
    return arr.includes(clean);
  }

  render(game, players) {
    this.topics = game.topics;
    this.$input.value = '';
    let { topics, selections, playerCount } = game;
    topics = topics.map(i => i.split(' ').join('&nbsp;'));
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
    for (let playerId in players)
      if (!selections || !selections[playerId])
        if (players[playerId].isAlive) {
          this.waiting.title('Waiting on...');
          this.waiting.add(this.userSpan(players[playerId]));
        }
  }

  _shuffledHtml(arr, topics) {
    if (arr.length === 2) {
      return `“${topics[arr[0]]}” &amp; “${topics[arr[1]]}”`;
    } else {
      let shuffled = shuffle(arr).map(idx => topics[idx]);
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
