const renderCardItem = (cardItem) => {
  return `<article class="film-card">
          <h3 class="film-card__title">${cardItem.title}</h3>
          <p class="film-card__rating">${cardItem.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${cardItem.year}</span>
            <span class="film-card__duration">1h&nbsp;13m</span>
            <span class="film-card__genre">${cardItem.genre}</span>
          </p>
          <img src=${cardItem.images} alt="" class="film-card__poster">
          <p class="film-card__description">${cardItem.description.join(` `)}</p>
          <button class="film-card__comments">${cardItem.commentsNumber} comments</button>

          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
          </form>
        </article>`;
};

export default renderCardItem;
