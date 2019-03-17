import Component from './component.js';
import moment from 'moment';

class FilmCard extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._description = data.description;
    this._images = data.images;
    this._rating = data.rating;
    this._genre = data.genre;
    this._releaseDate = data.releaseDate;
    this._commentsNumber = data.commentsNumber;
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;

    this._onCommentsClick = null;
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    return typeof this._onCommentsClick === `function` && this._onCommentsClick();
  }

  set onCommentsClick(fn) {
    this._onCommentsClick = fn;
  }

  get template() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
            <span class="film-card__duration">1h&nbsp;13m</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src=${this._images} alt="" class="film-card__poster">
          <p class="film-card__description">${this._description.join(` `)}</p>
          <button class="film-card__comments">${this._commentsNumber} comments</button>

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`.trim();
  }

  bind() {
    this._element.querySelector(`button.film-card__comments`)
      .addEventListener(`click`, this._onButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`button.film-card__comments`)
        .removeEventListener(`click`, this._onButtonClick);
  }
}

export default FilmCard;
