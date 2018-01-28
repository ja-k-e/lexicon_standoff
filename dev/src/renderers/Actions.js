import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Actions extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$header.appendChild(this.$h1);

    this.$desc = this.el('p', null, 'description');
    this.$main.appendChild(this.$desc);

    this.actions = new List('flex-list flex-list-half');
    this.append(this.$main, this.actions.elements);

    this.waiting = new List('flex-list flex-list-small flex-list-quarter');
    this.append(this.$main, this.waiting.elements);

    this.act = new Button({
      content: '',
      clickEvent: () => {
        let playerIds = Array.from(
          this.$section.querySelectorAll(':checked')
        ).map(el => el.value);
        this.events.dispatchAction(playerIds);
        this.act.disable();
        this.$main.classList.add('inactive');
      }
    });
    if (this.player.isMaster) {
      let $inst = this.el(
          'p',
          `Play will proceed after everyone submits a Vote.`,
          'instruction'
        ),
        cancel = new Button({
          content: 'End',
          clickEvent: this.handleConfirmEnd.bind(this),
          classname: 'warning'
        });
      let $grp = this.el('div', null, 'item-group');
      this.append($grp, [cancel.$el, this.act.$el]);
      this.act.$el.classList.add('flex');
      this.append(this.$footer, [$inst, $grp]);
    } else {
      this.act.$el.classList.add('full');
      this.append(this.$footer, [this.act.$el]);
    }
  }

  render(game, players) {
    let { actions, imposterCount, playerCount, selections } = game;
    this.$main.classList.remove('inactive');
    this.actions.reset();
    this.act.disable();
    this.toggleSections();

    this.$h1.innerHTML = this.roleHeader('Actions');

    // If this player has already voted (refreshed the vote page after voting)
    if (actions && actions[this.player.id]) {
      this.actions.title('You have already voted!');
      this.act.content('You have voted');
      this.act.disable();
    } else {
      this.$footer.classList.remove('hide');
      let agentCount = Object.keys(players).length - imposterCount,
        agentS = this._pluralize(agentCount, 'Agent'),
        voteS = imposterCount === 1 ? '1 Vote' : `${imposterCount} Votes`,
        playerS = imposterCount === 1 ? '1 Player' : `${imposterCount} Players`;

      this.act.content(`Submit ${voteS}`);
      this.$desc.innerHTML = ` Select ${playerS} to <strong>Kill</strong>. There are ${agentS}.`;
      let playerIds = Object.keys(selections).sort((a, b) => {
        let sa = selections[a].time,
          sb = selections[b].time;
        if (sa < sb) return 1;
        if (sa > sb) return -1;
        sa = selections[a].selection.toLowerCase();
        sb = selections[b].selection.toLowerCase();
        if (sa < sb) return -1;
        if (sa > sb) return 1;
        return 0;
      });
      playerIds.forEach(playerId => {
        if (playerId !== this.player.id) {
          let player = players[playerId];
          let $input = this.el('input');
          $input.setAttribute('type', 'checkbox');
          $input.setAttribute('value', playerId);
          $input.addEventListener('change', () => {
            this.handleChangedInput(imposterCount);
          });
          $input.setAttribute('id', playerId);
          let { selection } = selections[playerId],
            $label = this.el(
              'label',
              `
            ${this.userSpan(player)}
            <span class="selection">${selection}</span>
            `
            );
          $label.setAttribute('for', playerId);
          let $li = this.el('li');
          this.append($li, [$input, $label]);
          this.actions.$ul.appendChild($li);
        }
      });
    }

    this.renderWaiting({ players, actions });
  }

  handleChangedInput(count) {
    let checked = this.actions.$ul.querySelectorAll('input:checked');
    if (checked.length === count) this.act.enable();
    else this.act.disable();
  }

  renderWaiting({ players, actions }) {
    this.waiting.reset();
    for (let playerId in players)
      if (!actions || !actions[playerId]) {
        this.waiting.title('Waiting on...');
        this.waiting.add(this.userSpan(players[playerId]));
      }
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
    return ['dispatchAction', 'dispatchEnd'];
  }
}
