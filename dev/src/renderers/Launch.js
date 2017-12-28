import Renderer from './Renderer';
import Button from './modules/Button';

export default class Launch extends Renderer {
  renderInitial() {
    let $inst = this.el(
        'p',
        `If you are on a mobile device, add this site to your home screen to get full screen.
          iOS can only do this through Safari.`,
        'instruction'
      ),
      $or = this.el('p', 'Enter a Secret to Join'),
      $link = this.el(
        'p',
        '<br><a href="/instructions/">Instructions</a>',
        'instruction'
      ),
      $slug = this.el('input'),
      $grp = this.el('div', null, 'item-group');
    this.new = new Button({
      content: 'Create a Game',
      clickEvent: this.events.createGame.bind(this)
    });
    this.join = new Button({
      content: 'Join',
      clickEvent: () =>
        this.events.findGame($slug.value.replace(/ /g, '').toLowerCase())
    });

    this.$user = this.el('p', null, 'user-info');
    $slug.setAttribute('type', 'text');
    $slug.setAttribute('placeholder', 'gamesecret');
    this.append($grp, [$slug, this.join.$el]);
    this.append(this.$main, [this.$user, this.new.$el, $or, $grp, $link]);
    this.$footer.appendChild($inst);
  }

  render({ user }) {
    this.toggleSections();
    this.$user.innerHTML = `<img src="${user.image}" /> <span>${user.name}</span>`;
  }

  get _name() {
    return 'launch';
  }

  get _eventsList() {
    return ['createGame', 'findGame'];
  }
}
