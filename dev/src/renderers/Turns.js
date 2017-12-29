import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';
import shuffle from '../utils/shuffle';

export default class Turns extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$topics = this.el('p', null, 'topics');
    this.$desc = this.el('p', null, 'description');
    this.$keyMaster = this.el('div');
    this.$header.appendChild(this.$h1);
    this.append(this.$main, [this.$topics, this.$desc, this.$keyMaster]);

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

  render({
    topics,
    confusionVotes,
    keyMasterId,
    playerCount,
    playerCountAlive
  }) {
    let role = this.player.capitalizedRole;
    topics = topics.map(i => [i[0], i[1].split(' ').join('&nbsp;')]);
    this.$h1.innerHTML = `
      <span class="status">Turns</span>
      <span class="info"><span class="${this.player._
        .role}">${role}</span></span>`;

    let deadPlayers = playerCount !== playerCountAlive;
    if (this.player.id === keyMasterId && deadPlayers) {
      this.$keyMaster.innerHTML = `
        <p class="description">You are the <strong>Key Master</strong>. The Topic of confusion is:</p>
        <p class="topics">“${topics[4][1]}”</p>
      `;
    } else {
      this.$keyMaster.innerHTML = '';
    }

    if (this.player._.alive) {
      let descHtml = '',
        topicsHtml;
      if (this.player._.confused) {
        let confusionVoteCount = confusionVotes[this.player.id],
          confusionPlayers = confusionVoteCount === 1 ? 'Player' : 'Players';
        descHtml += `You have been confused by ${confusionVoteCount} dead ${confusionPlayers}! `;
      }
      if (this.player._.role === 'imposter') {
        if (this.player._.confused)
          topicsHtml = this._shuffledHtml([0, 1, 2, 3, 4], topics);
        else topicsHtml = this._shuffledHtml([0, 1, 2, 3], topics);
      } else {
        if (this.player._.confused)
          topicsHtml = this._shuffledHtml([0, 1, 4], topics);
        else topicsHtml = this._shuffledHtml([0, 1], topics);
      }
      if (this.player._.confused || this.player._.role === 'imposter') {
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

  _shuffledHtml(arr, topics) {
    if (arr.length === 2) {
      return `“${topics[arr[0]][1]}” &amp; “${topics[arr[1]][1]}”`;
    } else {
      let shuffled = shuffle(arr).map(idx => topics[idx][1]);
      let html = '';
      shuffled.forEach((topic, i) => {
        if (i < shuffled.length - 1) html += `“${topic}”, `;
        else html += `or “${topic}”`;
      });
      return html;
    }
  }

  get _name() {
    return 'turns';
  }

  get _eventsList() {
    return ['dispatchReveal'];
  }
}
