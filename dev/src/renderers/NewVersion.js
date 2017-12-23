import Renderer from './Renderer';

export default class Launch extends Renderer {
  renderInitial() {
    let $h1 = this.el('h1', 'Lexicon Standoff'),
      $desc = this.el(
        'p',
        'Your web app is out of date. Please close and reopen it.',
        'description'
      );
    this.append(this.$main, [$h1, $desc]);
  }

  render() {
    this.toggleSections();
  }

  get _name() {
    return 'new-version';
  }

  get _eventsList() {
    return [];
  }
}
