import Renderer from './Renderer';

export default class Auth extends Renderer {
  renderInitial() {
    let $h1 = this.el('h1', 'Lexicon Standoff'),
      $desc = this.el('p', 'Please Sign In', 'description'),
      $google = this.el('button', 'Google'),
      // $facebook = this.el('button', 'Facebook'),
      $twitter = this.el('button', 'Twitter');
    // this.append(this.$main, [$h1, $desc, $google, $facebook, $twitter]);
    this.append(this.$main, [$h1, $desc, $google, $twitter]);
    $google.addEventListener('click', () => {
      this.events.authGoogle();
    });
    // $facebook.addEventListener('click', () => {
    //   this.events.authFacebook();
    // });
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
    return ['authTwitter', 'authGoogle', 'authFacebook'];
  }
}
