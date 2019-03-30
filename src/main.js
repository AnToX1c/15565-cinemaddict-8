import Filter from './filter.js';
import getFilter from './get-filter.js';
import getFilmCard from './get-film-card.js';
import FilmCard from './film-card.js';
import FilmPopup from './film-popup.js';

const NUMBER_OF_CARDS = 7;
const NUMBER_OF_TOPCARDS = 2;
const NUMBER_OF_FILTERS = 4;
const mainNavigationContainer = document.querySelector(`.main-navigation`);
const mainNavigationAdditionalItem = document.querySelector(`.main-navigation__item--additional`);
const filmListContainer = document.querySelector(`.films-list__container`);
const filmListExtra = document.querySelectorAll(`.films-list--extra .films-list__container`);

const getCards = (amount) => {
  const allCards = [];
  for (let i = 0; i < amount; i++) {
    allCards.push(getFilmCard());
  }
  return allCards;
};

const initialCards = getCards(NUMBER_OF_CARDS);

const fillTheCards = (destination, cards) => {
  for (const el of cards) {
    const filmCard = new FilmCard(el);
    const filmPopup = new FilmPopup(el);
    destination.appendChild(filmCard.render());
    filmCard.onCommentsClick = () => {
      document.body.appendChild(filmPopup.render());
    };
    filmCard.onAddToWatchList = () => {
      el.isWatchlist = !el.isWatchlist;
      filmPopup._isWatchlist = !filmPopup._isWatchlist;
    };
    filmCard.onMarkAsWatched = () => {
      el.isWatched = !el.isWatched;
      filmPopup._isWatched = !filmPopup._isWatched;
    };
    filmPopup.onCloseButtonClick = () => {
      filmPopup.unrender();
    };
    filmPopup.onSubmit = (newObject) => {
      el.isWatchlist = newObject.isWatchlist === `on`;
      el.isWatched = newObject.isWatched === `on`;
      el.isFavorite = newObject.isFavorite === `on`;
      el.comment = newObject.comment;
      el.score = newObject.score;

      filmCard.update(el);
      filmPopup.unrender();
    };
  }
};

const getFilters = () => {
  const filters = [];
  for (let i = 0; i < NUMBER_OF_FILTERS; i++) {
    filters.push(getFilter(i));
  }
  filters[0].amount = ``;
  filters[0].isActive = true;
  return filters;
};

const filters = getFilters();

const renderFilters = () => {
  for (const filter of filters) {
    const filterComponent = new Filter(filter);

    filterComponent.onFilter = (evt) => {
      const filterElements = mainNavigationContainer.querySelectorAll(`.main-navigation__item`);
      for (const el of filterElements) {
        el.classList.remove(`main-navigation__item--active`);
      };
      evt.target.classList.add(`main-navigation__item--active`);
      const filterName = evt.target.firstChild.data;
      const filteredCards = filterCards(initialCards, filterName);
      console.log(filteredCards);
      filmListContainer.innerHTML = ``;
      fillTheCards(filmListContainer, filteredCards);
    };

    mainNavigationContainer.insertBefore(filterComponent.render(), mainNavigationAdditionalItem);
  }
};

const filterCards = (cards, filterName) => {
  switch (filterName) {
    case `All movies`:
      return cards;

    case `Watchlist `:
      return cards.filter((it) => it.isWatchlist);

    case `History `:
      return cards.filter((it) => it.isWatched);

    case `Favorites `:
      return cards.filter((it) => it.isFavorite);
  }
  return cards;
};

renderFilters();
fillTheCards(filmListContainer, initialCards);

for (const el of filmListExtra) {
  const extraCards = getCards(NUMBER_OF_TOPCARDS)
  fillTheCards(el, extraCards);
}
