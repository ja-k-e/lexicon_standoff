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
    this.$editor = this.el('div', null, 'editor');
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
    this.append(this.$main, [
      this.$user,
      this.new.$el,
      $or,
      $grp,
      $link,
      this.$editor
    ]);
    this.$footer.appendChild($inst);
  }

  render({ user }) {
    this.renderEditor(user);
    this.toggleSections();
    this.$avatar = this.el('img');
    this.$avatar.src = user.avatar;
    this.$name = this.el('span', user.name);
    let edit = new Button({
      content: '',
      clickEvent: () => this.$editor.classList.add('active')
    });
    edit.$el.appendChild(this.$avatar);
    edit.$el.appendChild(this.$name);

    this.$user.innerHTML = '';
    this.$user.appendChild(edit.$el);
  }

  renderEditor(user) {
    this.$editor.innerHTML = '';
    let $images = this.el('ul', null, 'image-select'),
      existing = user.avatar;
    Launch._avatars.forEach(name => {
      let $li = this.el('li'),
        url = Launch._avatarUrl(name),
        $button = new Button({
          content: `<img src="${url}" />`,
          clickEvent: () => this.handleAvatar($li, url)
        });
      if (existing === url) $li.className = 'active';
      $li.appendChild($button.$el);
      $images.appendChild($li);
    });
    let def =
      'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
    if (user.image && user.image !== def) {
      let $li = this.el('li'),
        $button = new Button({
          content: `<img src="${user.image}" />`,
          clickEvent: () => this.handleAvatar($li, user.image)
        });
      if (existing === user.image) $li.className = 'active';
      $li.appendChild($button.$el);
      $images.appendChild($li);
    }
    this.$editor.appendChild($images);
  }

  handleAvatar($li, avatar) {
    let $existing = this.$editor.querySelector('li.active');
    if ($existing) $existing.classList.remove('active');
    $li.classList.add('active');
    this.$editor.classList.remove('active');
    this.events.updateUser({ avatar });
  }

  static _avatarUrl(name) {
    return `${Launch._avatarBase}/${name}`;
  }

  get _name() {
    return 'launch';
  }

  get _eventsList() {
    return ['createGame', 'findGame', 'updateUser'];
  }

  static get _avatarBase() {
    return '/assets';
  }

  static get _avatars() {
    return [
      'avatar-bear.svg',
      'avatar-donkey.svg',
      'avatar-raccoon.svg',
      'avatar-squirrel.svg',
      'avatar-elephant.svg',
      'avatar-mouse.svg',

      'avatar-panda.svg',
      'avatar-deer.svg',
      'avatar-pig.svg',
      'avatar-cat.svg',
      'avatar-dog.svg',
      'avatar-wolf.svg',

      'avatar-monkey.svg',
      'avatar-fox.svg',
      'avatar-zebra.svg',
      'avatar-rabbit.svg'
    ];
  }
}
