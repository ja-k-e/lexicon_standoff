import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Actions extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$header.appendChild(this.$h1);

    this.$desc = this.el('p', null, 'description');
    this.$main.appendChild(this.$desc);

    this.actions = new List();
    this.append(this.$main, this.actions.elements);

    this.waiting = new List('flex-list flex-list-small flex-list-quarter');
    this.append(this.$main, this.waiting.elements);

    this.act = new Button({
      content: '',
      clickEvent: () => {
        let playerId = this.$section.querySelector(':checked').value;
        this.events.dispatchAction(playerId);
        this.act.disable();
        this.$main.classList.add('inactive');
      }
    });
    if (this.player.isMaster) {
      let $inst = this.el(
        'p',
        `Play will proceed after every Player submits an Action.`,
        'instruction'
      );
      let $grp = this.el('div', null, 'item-group'),
        back = new Button({
          content: '◀',
          clickEvent: this.events.back.bind(this)
        });
      this.append($grp, [back.$el, this.act.$el]);
      this.act.$el.classList.add('flex');
      this.append(this.$footer, [$inst, $grp]);
    } else {
      this.act.$el.classList.add('full');
      this.append(this.$footer, [this.act.$el]);
    }
  }

  render(game, players) {
    let { actions, imposterCount, playerCount, playerCountAlive } = game;
    this.$main.classList.remove('inactive');
    this.act.enable();
    this.actions.reset();
    this.toggleSections();

    this.$h1.innerHTML = this.roleHeader('Actions');

    // If this player has already voted (refreshed the vote page after voting)
    if (actions && actions[this.player.id]) {
      this.actions.title('You have already voted!');
      this.act.disable();
      this.$footer.classList.add('hide');
    } else {
      this.$footer.classList.remove('hide');
      this.actions.title('Select a Player');
      let agentCount = Object.keys(players).length - imposterCount,
        imposterS = this._pluralize(imposterCount, 'Imposter'),
        agentS = this._pluralize(agentCount, 'Agent'),
        alive = this.player.isAlive,
        last = playerCountAlive === 2,
        term = alive || last ? 'Kill' : 'Confuse',
        extra = alive || last ? '' : 'You’re Dead.';
      this.act.content(term);
      this.$desc.innerHTML = ` ${last ? 'This is the final vote!' : ''}
        ${extra} Select a Player to <strong>${term}</strong>.`;
      if (this.player.isAlive)
        this.$desc.innerHTML += ` There are ${agentS} and ${imposterS} in total.`;
      let first = true;
      for (let playerId in players) {
        if (playerId !== this.player.id) {
          let player = players[playerId];
          if (player.isAlive) {
            let selected = first ? 'checked' : '';
            if (first) first = false;
            this.actions.add(`
              <input id="${playerId}" value="${playerId}"
                type="radio" name="actions" ${selected} />
              <label for="${playerId}">${this.userSpan(player)}</label>
            `);
          }
        }
      }
    }

    this.renderWaiting({ players, actions });
  }

  renderWaiting({ players, actions }) {
    this.waiting.reset();
    this.waiting.title('Waiting on...');
    for (let playerId in players)
      if (!actions || !actions[playerId])
        this.waiting.add(this.userSpan(players[playerId]));
  }

  _pluralize(count, word) {
    if (count === 1) {
      return `1 ${word}`;
    } else {
      return `${count} ${word}s`;
    }
  }

  get _name() {
    return 'actions';
  }

  get _eventsList() {
    return ['dispatchAction', 'back'];
  }
}
