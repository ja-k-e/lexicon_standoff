import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';
import shuffle from '../utils/shuffle';

export default class Turns extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$topics = this.el('p', null, 'topics');
    this.$desc = this.el('p', null, 'description');
    this.$keyMaster = this.el('div', null, 'key-master');

    this.$header.appendChild(this.$h1);
    this.append(this.$main, [this.$topics, this.$desc, this.$keyMaster]);

    this.imposters = new List('flex-list flex-list-small flex-list-quarter');
    this.append(this.$main, this.imposters.elements);

    if (this.player.isMaster) this.renderInitialMaster();
  }

  renderInitialMaster() {
    let $inst = this.el(
      'p',
      `Take clockwise turns saying a word. You're first.
        After a Round, first turn moves to the next alive Player.
        Once everyone says a word, proceed.`,
      'instruction'
    );
    this.proceed = new Button({
      content: 'Proceed',
      clickEvent: this.events.dispatchReveal.bind(this)
    });
    this.append(this.$footer, [$inst, this.proceed.$el]);
  }

  render(game, players) {
    let {
      turns,
      topics,
      confusionVotes,
      keyMasterId,
      playerCount,
      playerCountAlive
    } = game;
    topics = topics.map(i => [i[0], i[1].split(' ').join('&nbsp;')]);
    this.$h1.innerHTML = this.roleHeader('Turns');

    if (this.player.id === keyMasterId && turns > 2) {
      this.$keyMaster.innerHTML = `
        <p class="description">You’re the <strong>Key Master</strong>.<br>The Topic of Confusion is</p>
        <p class="topics">“${topics[4][1]}”</p>
      `;
    } else {
      this.$keyMaster.innerHTML = '';
    }

    this.imposters.reset();
    if (this.player.isDead || (playerCount > 4 && this.player.isImposter))
      this.renderImposters(players);

    if (this.player.isAlive) {
      let descHtml = '',
        topicsHtml;
      if (this.player.isConfused) {
        let confusionVoteCount = confusionVotes[this.player.id],
          confusionPlayers = confusionVoteCount === 1 ? 'Player' : 'Players';
        descHtml += `You have been confused by ${confusionVoteCount} dead ${confusionPlayers}! `;
      }
      if (this.player.isImposter) {
        if (this.player.isConfused)
          topicsHtml = this._shuffledHtml([0, 1, 2, 3, 4], topics);
        else topicsHtml = this._shuffledHtml([0, 1, 2, 3], topics);
      } else {
        if (this.player.isConfused)
          topicsHtml = this._shuffledHtml([0, 1, 4], topics);
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
    return ['dispatchReveal'];
  }
}
