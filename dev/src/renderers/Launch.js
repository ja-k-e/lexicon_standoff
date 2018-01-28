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
      $or = this.el('p', 'OR', 'instruction'),
      $instructions = this.el(
        'p',
        '<br><a href="/instructions/">Instructions</a>',
        'instruction'
      ),
      $signOut = this.el('div', null, 'instructions'),
      signOut = new Button({
        content: 'Sign Out',
        classname: 'small link',
        clickEvent: this.events.signOut.bind(this)
      }),
      $grp = this.el('div', null, 'item-group');
    this.$slug = this.el('input');
    this.$editor = this.el('div', null, 'editor');
    this.new = new Button({
      content: 'Create Game',
      clickEvent: () => {
        this.$main.classList.add('inactive');
        this.events.createGame();
      }
    });
    this.join = new Button({
      content: 'Join',
      clickEvent: () => {
        this.events.findGame(this.$slug.value.replace(/ /g, '').toLowerCase());
      },
      submit: true
    });

    this.$user = this.el('p', null, 'user-info');
    this.$slug.setAttribute('type', 'text');
    this.$slug.setAttribute('placeholder', 'gamesecret');
    this.append($signOut, [signOut.$el]);
    this.append($grp, [this.$slug, this.join.$el]);
    this.append(this.$main, [
      this.$user,
      $grp,
      $or,
      this.new.$el,
      $instructions,
      $signOut,
      this.$editor
    ]);
    this.$footer.appendChild($inst);
  }

  render({ user }) {
    this.$main.classList.remove('inactive');
    this.$slug.value = '';
    this.renderEditor(user);
    this.toggleSections();
    this.$avatar = this.el('img');
    this.$avatar.src = user.avatar;
    this.$name = this.el('span', user.name);
    this.edit = new Button({
      content: '',
      clickEvent: () => this.$editor.classList.add('active')
    });
    this.edit.$el.appendChild(this.$avatar);
    this.edit.$el.appendChild(this.$name);

    this.$user.innerHTML = '';
    this.$user.appendChild(this.edit.$el);
  }

  renderEditor(user) {
    this.$editor.innerHTML = '';
    this._renderImageSelector(user);
    this._renderNameInput(user);
  }

  _renderNameInput(user) {
    let $grp = this.el('div', null, 'item-group'),
      $input = this.el('input'),
      save = new Button({
        content: 'Save',
        clickEvent: () => this.handleName($input.value)
      });
    $input.setAttribute('type', 'text');
    $input.setAttribute('placeholder', 'Your Name');
    $input.setAttribute('maxlength', 8);
    $input.value = user.name;
    this.append($grp, [$input, save.$el]);
    this.$editor.appendChild($grp);
  }

  _renderImageSelector(user) {
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

  handleName(name) {
    name = name.substring(0, 8);
    this.$editor.classList.remove('active');
    this.events.updateUser({ name });
  }

  static _avatarUrl(name) {
    return `${Launch._avatarBase}/${name}`;
  }

  get _name() {
    return 'launch';
  }

  get _eventsList() {
    return ['createGame', 'findGame', 'signOut', 'updateUser'];
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
