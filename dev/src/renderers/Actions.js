import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Actions extends Renderer {
  renderInitial() {
    this.$h1 = this.el('h1');
    this.$header.appendChild(this.$h1);

    this.$desc = this.el('p', null, 'description');
    this.$main.appendChild(this.$desc);

    this.votes = new List();
    this.append(this.$main, this.votes.elements);

    this.graveyard = new List();
    this.append(this.$main, this.graveyard.elements);

    this.vote = new Button({
      content: '',
      clickEvent: () => {
        let playerId = this.$section.querySelector(':checked').value;
        this.events.dispatchAction(playerId);
        this.vote.disable();
        this.$main.classList.add('inactive');
      }
    });
    this.append(this.$footer, [this.vote.$el]);
  }

  render({ players, votes, imposterCount }) {
    this.$main.classList.remove('inactive');
    this.vote.enable();
    this.votes.reset();
    this.graveyard.reset();
    this.toggleSections();
    let alive = this.player._.alive;

    this.graveyard.title('Graveyard');
    let role = this.player.capitalizedRole;
    this.$h1.innerHTML = `
      <span class="status">Actions</span> <span class="info"><span class="throb">${role}</span></span>`;
    // If this player has already voted (refreshed the vote page after voting)
    if (votes && votes[this.player.id]) {
      this.votes.title('You have already voted!');
      this.vote.disable();
      this.$footer.classList.add('hide');
    } else {
      this.$footer.classList.remove('hide');
      this.votes.title('Select a Player');
      let agentCount = Object.keys(players).length - imposterCount,
        isAre = imposterCount === 1 ? 'is' : 'are',
        imposterS = this._pluralize(imposterCount, 'Imposter'),
        agentS = this._pluralize(agentCount, 'Agent'),
        term = this.player._.alive ? 'Kill' : 'Confuse',
        extra = this.player._.alive ? '' : 'You are Dead.';
      this.vote.content(term);
      this.$desc.innerHTML = `
        ${extra} Vote for the Player you want to <strong>${term}</strong>.
        There ${isAre} a total of ${imposterS} and ${agentS}.`;
      let first = true;
      for (let playerId in players) {
        if (playerId !== this.player.id) {
          let player = players[playerId];
          if (player._.alive) {
            let selected = first ? 'checked' : '';
            if (first) first = false;
            this.votes.add(`
              <input id="${playerId}" value="${playerId}"
                type="radio" name="votes" ${selected} />
              <label for="${playerId}">${this.userSpan(player)}</label>
            `);
          }
        }
      }
    }

    let graveyard = false;
    for (let playerId in players) {
      let player = players[playerId];
      if (!player._.alive) {
        graveyard = true;
        this.graveyard.add(this.userSpan(player));
      }
    }
    if (!graveyard)
      this.graveyard.$ul.innerHTML = '<li class="empty">Empty</li>';
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
    return ['dispatchAction'];
  }
}
