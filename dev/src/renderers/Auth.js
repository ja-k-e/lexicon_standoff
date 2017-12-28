import Renderer from './Renderer';

export default class Auth extends Renderer {
  renderInitial() {
    let $h1 = this.el('h1', 'Lexicon Standoff'),
      $desc = this.el('p', 'Please Sign In', 'description'),
      $google = this.el('button', 'Google'),
      $twitter = this.el('button', 'Twitter');
    this.append(this.$main, [$h1, $desc, $google, $twitter]);
    $google.addEventListener('click', () => {
      this.events.authGoogle();
    });
    $twitter.addEventListener('click', () => {
      this.events.authTwitter();
    });
  }

  render() {
    this.toggleSections();
  }

  get _name() {
    return 'auth';
  }

  get _eventsList() {
    return ['authTwitter', 'authGoogle'];
  }
}
