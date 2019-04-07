import Component from './component.js';
import moment from 'moment';

class FilmCard extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._totalRating = data.totalRating;
    this._poster = data.poster;
    this._description = data.description;
    this._release = data.release;
    this._runtime = data.runtime;
    this._genre = data.genre;
    this._personalRating = data.personalRating;
    this._comments = data.comments;
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;

    this._onCommentsClick = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
  }

  _onButtonClick() {
    return typeof this._onCommentsClick === `function` && this._onCommentsClick();
  }
  _onAddToWatchListClick(evt) {
    evt.preventDefault();
    return typeof this._onAddToWatchList === `function` && this._onAddToWatchList();
  }
  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    return typeof this._onMarkAsWatched === `function` && this._onMarkAsWatched();
  }

  set onCommentsClick(fn) {
    this._onCommentsClick = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  get template() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._release).format(`YYYY`)}</span>
            <span class="film-card__duration">${moment.duration({"minutes": this._runtime}).hours()}h&nbsp;${moment.duration({"minutes": this._runtime}).minutes()}m</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src=${this._poster} alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <button class="film-card__comments">${this._comments.length} comment${this._comments.length > 1 ? `s` : ``}</button>

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`.trim();
  }

  bind() {
    this._element.querySelector(`button.film-card__comments`).addEventListener(`click`, this._onButtonClick.bind(this));
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onAddToWatchListClick.bind(this));
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onMarkAsWatchedClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`button.film-card__comments`).removeEventListener(`click`, this._onButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onMarkAsWatchedClick);
  }

  update(data) {
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._comments = data.comments;
    this._personalRating = data.personalRating;
  }
}

export default FilmCard;
