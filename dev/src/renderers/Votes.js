import Renderer from './Renderer';
import Button from './modules/Button';
import List from './modules/List';

export default class Votes extends Renderer {
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
      content: 'Vote',
      clickEvent: () => {
        let playerId = this.$section.querySelector(':checked').value;
        this.events.dispatchVote(playerId);
        this.vote.disable();
        this.$main.classList.add('inactive');
      }
    });
    this.append(this.$footer, [this.vote.$el]);
  }

  render({ players, votes, impostorCount }) {
    this.$main.classList.remove('inactive');
    this.vote.enable();
    this.votes.reset();
    this.graveyard.reset();
    this.toggleSections();

    this.graveyard.title('Graveyard');
    let role = this.player.capitalizedRole;
    this.$h1.innerHTML = `
      <span class="status">Votes</span> <span class="info"><span class="throb">${role}</span></span>`;
    // If this player has already voted (refreshed the vote page after voting)
    if (votes && votes[this.player.id]) {
      this.votes.title('You have already voted!');
      this.$footer.classList.add('hide');
      this.vote.disable();
    } else {
      if (this.player._.alive) {
        this.$footer.classList.remove('hide');
        this.votes.title('Select a Player');
        let agentCount = Object.keys(players).length - impostorCount,
          isAre = impostorCount === 1 ? 'is' : 'are',
          impostorS = this._pluralize(impostorCount, 'Impostor'),
          agentS = this._pluralize(agentCount, 'Agent');
        this.$desc.innerHTML = `
          Vote for the Player you want to Kill. There ${isAre} a total of ${impostorS} and ${agentS}.`;

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
      } else {
        this.renderDead(this.$desc);
        this.$footer.classList.add('hide');
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
    return 'votes';
  }

  get _eventsList() {
    return ['dispatchVote'];
  }
}
