import Component from './component.js';
import moment from 'moment';

const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;

class FilmPopup extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._originalTitle = data.originalTitle;
    this._totalRating = data.totalRating;
    this._poster = data.poster;
    this._ageRating = data.ageRating;
    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors;
    this._release = data.release;
    this._releaseCountry = data.releaseCountry;
    this._runtime = data.runtime;
    this._genre = data.genre;
    this._description = data.description;
    this._personalRating = data.personalRating;
    this._comments = data.comments; // добавить emojies в разметку
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._watchingDate = data.watchingDate;

    this._onClick = null;
    this._onSubmit = null;
    this._onRatingClick = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onUserRatingClick = this._onUserRatingClick.bind(this);
    this._onPopupEscPress = this._onPopupEscPress.bind(this);
    this._onDocumentCtrlEnterPress = this._onDocumentCtrlEnterPress.bind(this);
  }

  _onCloseButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onPopupEscPress(evt) {
    return evt.keyCode === ESC_KEYCODE && typeof this._onClick === `function` && this._onClick();
  }

  _onUserRatingClick() {
    return typeof this._onRatingClick === `function` && this._onRatingClick();
  }

  _processForm(formData) {
    const entry = {
      isWatchlist: this._isWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite,
      comment: {
        author: `user`,
        emotion: `neutral-face`,
        comment: ``,
        date: new Date()
      },
      personalRating: this._personalRating,
    };

    const filmPopupMapper = FilmPopup.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (filmPopupMapper[property]) {
        filmPopupMapper[property](value);
      }
    }
    return entry;
  }

  _onDocumentCtrlEnterPress(evt) {
    if (evt.ctrlKey && evt.keyCode === ENTER_KEYCODE) {
      const formData = new FormData(this._element.querySelector(`.film-details__inner`));
      const newData = this._processForm(formData);
      if (typeof this._onSubmit === `function`) {
        this._onSubmit(newData);
      }

      this.update(newData);
    }
  }

  update(data) {
    this._isWatchlist = data.isWatchlist === `on`;
    this._isWatched = data.isWatched === `on`;
    this._isFavorite = data.isFavorite === `on`;
    if (data.comment.comment) {
      this._comments.push(data.comment);
    }
    this._personalRating = data.personalRating;
  }

  shake() {
    this._element.style.border = `solid red 5px`;
    setTimeout(() => {
      this._element.style.border = ``;
    }, 2000);
    const keyframe = [
      {transform: `translateX(0)`},
      {transform: `translateX(-5px)`},
      {transform: `translateX(5px)`}
    ];
    this._element.animate(keyframe, {duration: 600, iterations: 3});
  }

  static createMapper(target) {
    return {
      'watchlist': (value) => (target.isWatchlist = value),
      'watched': (value) => (target.isWatched = value),
      'favorite': (value) => (target.isFavorite = value),
      'comment': (value) => (target.comment.comment = value),
      'comment-emoji': (value) => (target.comment.emotion = value),
      'score': (value) => (target.personalRating = parseInt(value, 10))
    };
  }

  set onCloseButtonClick(fn) {
    this._onClick = fn;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onUserRatingClick(fn) {
    this._onRatingClick = fn;
  }

  get template() {
    return `<section class="film-details">
              <form class="film-details__inner" action="" method="get">
                <div class="film-details__close">
                  <button class="film-details__close-btn" type="button">close</button>
                </div>
                <div class="film-details__info-wrap">
                  <div class="film-details__poster">
                    <img class="film-details__poster-img" src=${this._poster} alt=${this._title}>

                    <p class="film-details__age">${this._ageRating}</p>
                  </div>

                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">${this._title}</h3>
                        <p class="film-details__title-original">Original: ${this._originalTitle}</p>
                      </div>

                      <div class="film-details__rating">
                        <p class="film-details__total-rating">${this._totalRating}</p>
                        <p class="film-details__user-rating">Your rate ${this._personalRating}</p>
                      </div>
                    </div>

                    <table class="film-details__table">
                      <tr class="film-details__row">
                        <td class="film-details__term">Director</td>
                        <td class="film-details__cell">${this._director}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Writers</td>
                        <td class="film-details__cell">${this._writers.join(`, `)}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Actors</td>
                        <td class="film-details__cell">${this._actors.join(`, `)}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Release Date</td>
                        <td class="film-details__cell">${moment(this._releaseDate).format(`DD MMMM YYYY`)} (USA)</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Runtime</td>
                        <td class="film-details__cell">${this._runtime} min</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Country</td>
                        <td class="film-details__cell">${this._releaseCountry}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Genres</td>
                        <td class="film-details__cell">
                        ${this._genre.map((genre) => (`<span class="film-details__genre">${genre}</span>`)).join(` `)}</td>
                      </tr>
                    </table>

                    <p class="film-details__film-description">
                      ${this._description}
                    </p>
                  </div>
                </div>

                <section class="film-details__controls">
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._isWatchlist ? `checked` : ``}>
                  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? `checked` : ``}>
                  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
                  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                </section>

                <section class="film-details__comments-wrap">
                  <h3 class="film-details__comments-title">Comment${this._comments.length > 1 ? `s` : ``} <span class="film-details__comments-count">${this._comments.length}</span></h3>

                  <ul class="film-details__comments-list">
                    ${this._comments.map((comm) => (`<li class="film-details__comment">
                      <span class="film-details__comment-emoji">😴</span>
                      <div>
                        <p class="film-details__comment-text">${comm.comment}</p>
                        <p class="film-details__comment-info">
                          <span class="film-details__comment-author">${comm.author}</span>
                          <span class="film-details__comment-day">${moment(comm.date).fromNow()}</span>
                        </p>
                      </div>
                    </li>`).trim()).join(``)}
                  </ul>

                  <div class="film-details__new-comment">
                    <div>
                      <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
                      <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

                      <div class="film-details__emoji-list">
                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                        <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                        <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                        <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
                      </div>
                    </div>
                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
                    </label>
                  </div>
                </section>

                <section class="film-details__user-rating-wrap">
                  <div class="film-details__user-rating-controls">
                    <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
                    <button class="film-details__watched-reset" type="button">undo</button>
                  </div>

                  <div class="film-details__user-score">
                    <div class="film-details__user-rating-poster">
                      <img src=${this._poster} alt="film-poster" class="film-details__user-rating-img">
                    </div>

                    <section class="film-details__user-rating-inner">
                      <h3 class="film-details__user-rating-title">${this._title}</h3>

                      <p class="film-details__user-rating-feelings">How you feel it?</p>

                      <div class="film-details__user-rating-score">
                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1" ${this._personalRating === 1 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-1">1</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2" ${this._personalRating === 2 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-2">2</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3" ${this._personalRating === 3 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-3">3</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4" ${this._personalRating === 4 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-4">4</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" ${this._personalRating === 5 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-5">5</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6" ${this._personalRating === 6 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-6">6</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7" ${this._personalRating === 7 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-7">7</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8" ${this._personalRating === 8 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-8">8</label>

                        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" ${this._personalRating === 9 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-9">9</label>
                      </div>
                    </section>
                  </div>
                </section>
              </form>
            </section>`.trim();
  }

  bind() {
    document.addEventListener(`keydown`, this._onPopupEscPress);
    document.addEventListener(`keydown`, this._onDocumentCtrlEnterPress);
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__user-rating-score`).addEventListener(`click`, this._onUserRatingClick);
  }

  unbind() {
    document.removeEventListener(`keydown`, this._onPopupEscPress);
    document.removeEventListener(`keydown`, this._onDocumentCtrlEnterPress);
    this._element.querySelector(`.film-details__close-btn`)
        .removeEventListener(`click`, this._onCloseButtonClick);
    this._element.querySelector(`.film-details__user-rating-score`)
        .removeEventListener(`click`, this._onUserRatingClick);
  }
}

export default FilmPopup;
