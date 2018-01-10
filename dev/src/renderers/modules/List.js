import Module from './Module';

export default class List extends Module {
  constructor(listClass = 'flex-list') {
    super();
    this.$title = this.el('p', null, 'label');
    this.$ul = this.el('ul', null, listClass);
  }

  add(liContent, classname) {
    let $li = this.el('li', liContent);
    if (classname) $li.className = classname;
    this.$ul.appendChild($li);
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
