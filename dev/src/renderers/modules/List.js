import Module from './Module';

export default class List extends Module {
  constructor(listClass = 'flex-list') {
    super();
    this.$title = this.el('p', null, 'label');
    this.$ul = this.el('ul', null, listClass);
  }

  add(liContent) {
    this.$ul.appendChild(this.el('li', liContent));
  }

  title(html) {
    this.$title.innerHTML = html;
  }

  instruction(html) {
    this.$instruction.innerHTML = html;
  }

  reset() {
    this.title('');
    this.$ul.innerHTML = '';
  }

  get elements() {
    return [this.$title, this.$ul];
  }
}
