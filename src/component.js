import createElement from './create-element.js';

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Cant instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  bind() {}

  unbind() {}

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}
