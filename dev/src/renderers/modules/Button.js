import Module from './Module';

export default class Button extends Module {
  constructor({ clickEvent, content = '', classname = '', submit = false }) {
    super();
    this.$el = this.el('button', content, classname);
    if (submit) this.$el.setAttribute('type', 'submit');
    else this.$el.setAttribute('type', 'button');
    if (clickEvent) this.$el.addEventListener('click', () => clickEvent());
  }

  enable() {
    this.$el.removeAttribute('disabled');
  }

  disable() {
    this.$el.setAttribute('disabled', true);
  }

  content(value) {
    this.$el.innerHTML = value;
  }
}
