import Component from './component.js';

class SearchField extends Component {
  constructor() {
    super();
    this._onInput = null;
    this._onSearchInput = this._onSearchInput.bind(this);
  }

  _onSearchInput(evt) {
    evt.preventDefault();
    const searchInput = evt.target.value;
    return typeof this._onInput === `function` && this._onInput(searchInput);
  }

  set onInput(fn) {
    this._onInput = fn;
  }

  get template() {
    return `<form class="header__search search">
    <input type="text" name="search" class="search__field" placeholder="Search">
    <button type="submit" class="visually-hidden">Search</button>
  </form>`;
  }

  bind() {
    this._element.addEventListener(`input`, this._onSearchInput);
  }
}

export default SearchField;
