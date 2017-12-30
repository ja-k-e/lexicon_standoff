import Renderer from './Renderer';

export default class Auth extends Renderer {
  renderInitial() {
    let $h1 = this.el('h1', 'Lexicon Standoff'),
      $desc = this.el('p', 'Please Sign In', 'description');
    this.$auth = this.el('div', null, 'firebaseui-auth');
    this.append(this.$main, [$h1, this.$auth]);
  }

  render() {
    this.toggleSections();
  }

  get _name() {
    return 'auth';
  }

  get _eventsList() {
    return [];
  }
}
