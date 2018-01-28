import Renderer from './Renderer';

export default class Auth extends Renderer {
  renderInitial() {
    let $h1 = this.el('h1', 'Lexicon Standoff'),
      $desc = this.el('p', 'Please Sign In', 'description'),
      $google = this.el('button', 'Google'),
      $twitter = this.el('button', 'Twitter'),
      $anon = this.el('button', 'Anonymously');
    this.append(this.$main, [$h1, $desc, $google, $twitter, $anon]);
    $google.addEventListener('click', () => {
      this.events.authGoogle();
    });
    $twitter.addEventListener('click', () => {
      this.events.authTwitter();
    });
    $anon.addEventListener('click', () => {
      this.events.authAnon();
    });
  }

  render() {
    this.toggleSections();
  }

  get _name() {
    return 'auth';
  }

  get _eventsList() {
    return ['authTwitter', 'authGoogle', 'authAnon'];
  }
}
