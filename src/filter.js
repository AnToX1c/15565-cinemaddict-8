import Component from './component.js';

class Filter extends Component {
  constructor(data) {
    super();
    this._caption = data.caption;
    this._amount = data.amount;
    this._isActive = data.isActive;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    return typeof this._onFilter === `function` && this._onFilter(evt);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `<a href="#${this._caption.toLowerCase().replace(/ /g, `_`)}" class="main-navigation__item${this._isActive ? ` main-navigation__item--active` : ``}">${this._caption}${this._amount > 0 ? ` <span class="main-navigation__item-count">${this._amount}</span>` : ``}</a>`;
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}

export default Filter;
