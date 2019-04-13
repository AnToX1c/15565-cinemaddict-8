import Filter from './filter.js';
import getFilter from './get-filter.js';
import FilmCard from './film-card.js';
import FilmPopup from './film-popup.js';
import Statistic from './statistic.js';
import API from './api.js';
import SearchField from './search.js';

const NUMBER_OF_EXTRACARDS = 4;
const NUMBER_OF_FILTERS = 4;
const NUMBER_SHOW_MORE_STEPS = 5;
const AUTHORIZATION = `Basic dXNeo0w590ik29889aZAo=0.1413233792199915`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;
const header = document.querySelector(`.header`);
const headerProfile = header.querySelector(`.header__profile`);
const mainContainer = document.querySelector(`.main`);
const mainNavigationContainer = mainContainer.querySelector(`.main-navigation`);
const statItem = mainNavigationContainer.querySelector(`.main-navigation__item--additional`);
const filmsContainer = mainContainer.querySelector(`.films`);
const filmsTitleContainer = filmsContainer.querySelector(`.films-list__title`);
const filmListContainer = filmsContainer.querySelector(`.films-list__container`);
const filmListExtra = filmsContainer.querySelectorAll(`.films-list--extra .films-list__container`);
const showMoreButton = filmsContainer.querySelector(`.films-list__show-more`);
let numberOfVisibleCards = NUMBER_SHOW_MORE_STEPS;
let statisticContainer = null;
let initialCards = [];
let filteredCards = [];
let isFiltered = false;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const fillTheCards = (destination, cards) => {
  filmsTitleContainer.classList.add(`visually-hidden`);
  destination.innerHTML = ``;

  for (const el of cards) {
    const filmCard = new FilmCard(el);
    const filmPopup = new FilmPopup(el);
    destination.appendChild(filmCard.render());
    filmCard.onCommentsClick = () => {
      document.body.appendChild(filmPopup.render());
    };
    filmCard.onAddToWatchList = () => {
      el.isWatchlist = !el.isWatchlist;
      api.updateFilm({id: el.id, data: el.toRAW()})
        .then((updatedFilm) => {
          filmCard.update(updatedFilm);
          filmPopup.update(updatedFilm);
        })
        .catch(() => filmCard.shake());
    };
    filmCard.onMarkAsWatched = () => {
      el.isWatched = !el.isWatched;
      api.updateFilm({id: el.id, data: el.toRAW()})
        .then((updatedFilm) => {
          filmCard.update(updatedFilm);
          filmPopup.update(updatedFilm);
        })
        .catch(() => filmCard.shake());
    };
    filmCard.onMarkAsFavorite = () => {
      el.isFavorite = !el.isFavorite;
      api.updateFilm({id: el.id, data: el.toRAW()})
        .then((updatedFilm) => {
          filmCard.update(updatedFilm);
          filmPopup.update(updatedFilm);
        })
        .catch(() => filmCard.shake());
    };
    filmPopup.onCloseButtonClick = () => {
      filmPopup.unrender();
    };
    // filmPopup.onUserRatingClick = (newPersonalRating) => {};
    filmPopup.onSubmit = (newObject) => {
      el.isWatchlist = newObject.isWatchlist === `on`;
      el.isWatched = newObject.isWatched === `on`;
      el.isFavorite = newObject.isFavorite === `on`;
      if (newObject.comment.comment) {
        el.comments.push(newObject.comment);
      }
      el.personalRating = newObject.personalRating;
      // block();

      // block();
      api.updateFilm({id: el.id, data: el.toRAW()})
        .then((updatedFilm) => {
          filmCard.update(updatedFilm);
          filmPopup.update(updatedFilm);
          filmPopup.unrender();
        })
        .catch(() => {
          filmPopup.shake();
        });
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

const showMoreFilms = () => {
  numberOfVisibleCards += NUMBER_SHOW_MORE_STEPS;
  const moreFilms = isFiltered ? filteredCards : initialCards;
  if (numberOfVisibleCards <= moreFilms.length) {
    fillTheCards(filmListContainer, moreFilms.slice(0, numberOfVisibleCards));
  } else {
    fillTheCards(filmListContainer, moreFilms);
    showMoreButton.classList.add(`visually-hidden`);
  }
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
      showMoreButton.classList.remove(`visually-hidden`);
      numberOfVisibleCards = NUMBER_SHOW_MORE_STEPS;
      isFiltered = true;

      const filterElements = mainNavigationContainer.querySelectorAll(`.main-navigation__item`);
      for (const el of filterElements) {
        el.classList.remove(`main-navigation__item--active`);
      }
      evt.target.classList.add(`main-navigation__item--active`);
      const filterName = evt.target.firstChild.data;
      filteredCards = filterCards(initialCards, filterName);
      fillTheCards(filmListContainer, filteredCards.slice(0, numberOfVisibleCards));
      unrenderStatistic();
    };

    mainNavigationContainer.insertBefore(filterComponent.render(), statItem);
  }
};

const getTopRatedFilms = (films) => {
  const filmsToSort = films.slice();
  return filmsToSort.sort((a, b) => {
    return b.totalRating - a.totalRating;
  }).slice(0, NUMBER_OF_EXTRACARDS);
};
const getMostCommentedFilms = (films) => {
  const filmsToSort = films.slice();
  return filmsToSort.sort((a, b) => {
    return b.comments.length - a.comments.length;
  }).slice(0, NUMBER_OF_EXTRACARDS);
};

const fillTheExtraCards = (films) => {
  for (const el of filmListExtra) {
    el.innerHTML = ``;
  }
  fillTheCards(filmListExtra[0], getTopRatedFilms(films));
  fillTheCards(filmListExtra[1], getMostCommentedFilms(films));
};

const renderSearch = () => {
  const searchComponent = new SearchField();
  header.insertBefore(searchComponent.render(), headerProfile);
  searchComponent.onInput = (searchInput) => {
    showMoreButton.classList.remove(`visually-hidden`);
    numberOfVisibleCards = NUMBER_SHOW_MORE_STEPS;
    isFiltered = true;
    filteredCards = initialCards.filter((it) => it.title.toLowerCase().includes(searchInput.toLowerCase()));
    fillTheCards(filmListContainer, filteredCards.slice(0, numberOfVisibleCards));
  };
};

renderSearch();
filmsTitleContainer.classList.remove(`visually-hidden`);
filmsTitleContainer.innerHTML = `Loading movies...`;

api.getFilms()
  .then((films) => {
    initialCards = films;
    renderFilters();
    fillTheCards(filmListContainer, films.slice(0, numberOfVisibleCards));
    fillTheExtraCards(films);
  })
  .catch(() => {
    filmsTitleContainer.classList.remove(`visually-hidden`);
    filmsTitleContainer.innerHTML = `Something went wrong while loading movies. Check your connection or try again later`;
  });

statItem.addEventListener(`click`, renderStatistic);
showMoreButton.addEventListener(`click`, showMoreFilms);
