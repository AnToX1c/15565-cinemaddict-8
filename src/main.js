import renderNavigationItem from './render-navigation-element.js';
import getFilmCard from './get-film-card.js';
import FilmCard from './film-card.js';
import FilmPopup from './film-popup.js';

const NUMBER_OF_CARDS = 1;
const NUMBER_OF_TOPCARDS = 0;
const mainNavigationContainer = document.querySelector(`.main-navigation`);
const filmListContainer = document.querySelector(`.films-list__container`);
const filmListExtra = document.querySelectorAll(`.films-list--extra .films-list__container`);

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getAllCards = (amount) => {
  const allCards = [];
  for (let i = 0; i < amount; i++) {
    allCards.push(getFilmCard());
  }
  return allCards;
};

const fillTheCards = (destination, amount) => {
  const allCards = getAllCards(amount);
  for (const el of allCards) {
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

const clearBoard = () => {
  filmListContainer.innerHTML = ``;
  fillTheCards(filmListContainer, getRandomInteger(1, 10));
};

let navigationElements;

mainNavigationContainer.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`Favorites`, `Favorites`, getRandomInteger(0, 120)));
mainNavigationContainer.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`History`, `History`, getRandomInteger(0, 120)));
mainNavigationContainer.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`Watchlist`, `Watchlist`, getRandomInteger(0, 120)));
mainNavigationContainer.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`All`, `All movies`, 0, true));

navigationElements = mainNavigationContainer.querySelectorAll(`.main-navigation__item`);
for (const el of navigationElements) {
  el.onclick = function (evt) {
    evt.preventDefault();
    clearBoard();
  };
}

for (const el of filmListExtra) {
  fillTheCards(el, NUMBER_OF_TOPCARDS);
}

fillTheCards(filmListContainer, NUMBER_OF_CARDS);
