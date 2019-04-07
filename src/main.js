import Filter from './filter.js';
import getFilter from './get-filter.js';
import FilmCard from './film-card.js';
import FilmPopup from './film-popup.js';
import Statistic from './statistic.js';
import API from './api.js';

const NUMBER_OF_TOPCARDS = 2;
const NUMBER_OF_FILTERS = 4;
const AUTHORIZATION = `Basic dXNeo0w590ik29889aZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;
const mainContainer = document.querySelector(`.main`);
const mainNavigationContainer = mainContainer.querySelector(`.main-navigation`);
const statItem = mainNavigationContainer.querySelector(`.main-navigation__item--additional`);
const filmsContainer = mainContainer.querySelector(`.films`);
const filmListContainer = mainContainer.querySelector(`.films-list__container`);
const filmListExtra = mainContainer.querySelectorAll(`.films-list--extra .films-list__container`);
let statisticContainer = null;
let initialCards = [];

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

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
      if (newObject.comment.comment) {
        el.comments.push(newObject.comment);
      }
      el.personalRating = newObject.personalRating;

      filmCard.update(el);
      filmPopup.unrender();
    };
  }
};

const renderStatistic = () => {
  const watchedFilms = initialCards.filter((it) => it.isWatched);
  const statisticComponent = new Statistic(watchedFilms);
  mainContainer.appendChild(statisticComponent.render());
  filmsContainer.classList.add(`visually-hidden`);
  statisticContainer = mainContainer.querySelector(`.statistic`);
  statisticContainer.querySelector(`.statistic__filters`).classList.remove(`visually-hidden`);
};

const unrenderStatistic = () => {
  if (statisticContainer) {
    statisticContainer.parentNode.removeChild(statisticContainer);
    statisticContainer = null;
  }
  filmsContainer.classList.remove(`visually-hidden`);
};

const filterCards = (cards, filterName) => {
  switch (filterName.trim()) {
    case `All movies`:
      return cards;

    case `Watchlist`:
      return cards.filter((it) => it.isWatchlist);

    case `History`:
      return cards.filter((it) => it.isWatched);

    case `Favorites`:
      return cards.filter((it) => it.isFavorite);
  }
  return cards;
};

const getFilters = () => {
  const filters = [];
  for (let i = 0; i < NUMBER_OF_FILTERS; i++) {
    filters.push(getFilter(i));
    filters[i].amount = filterCards(initialCards, filters[i].caption).length;
  }
  filters[0].amount = ``;
  filters[0].isActive = true;
  return filters;
};

const renderFilters = () => {
  const filters = getFilters();
  for (const filter of filters) {
    const filterComponent = new Filter(filter);

    filterComponent.onFilter = (evt) => {
      const filterElements = mainNavigationContainer.querySelectorAll(`.main-navigation__item`);
      for (const el of filterElements) {
        el.classList.remove(`main-navigation__item--active`);
      }
      evt.target.classList.add(`main-navigation__item--active`);
      const filterName = evt.target.firstChild.data;
      const filteredCards = filterCards(initialCards, filterName);
      filmListContainer.innerHTML = ``;
      fillTheCards(filmListContainer, filteredCards);
      unrenderStatistic();
    };

    mainNavigationContainer.insertBefore(filterComponent.render(), statItem);
  }
};

const fillTheExtraCards = () => {
  for (const el of filmListExtra) {
    const extraCards = initialCards.slice(0, NUMBER_OF_TOPCARDS);
    fillTheCards(el, extraCards);
  }
};

api.getFilms()
  .then((films) => {
    initialCards = films;
    renderFilters();
    fillTheCards(filmListContainer, films);
    fillTheExtraCards(); // временная, отрисовывает фильмы в дополнительные разделы
  });

statItem.addEventListener(`click`, renderStatistic);
