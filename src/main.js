import renderNavigationItem from './render-navigation-element.js';
import renderCardItem from './render-card-element.js';
import getFilmCard from './get-film-card.js';

const NUMBER_OF_CARDS = 7;
const NUMBER_OF_TOPCARDS = 2;
const mainNavigationElement = document.querySelector(`.main-navigation`);
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
    destination.insertAdjacentHTML(`beforeend`, renderCardItem(el));
  }
};

const clearBoard = () => {
  filmListContainer.innerHTML = ``;
  fillTheCards(filmListContainer, getRandomInteger(1, 10));
};

let navigationElements;

mainNavigationElement.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`Favorites`, `Favorites`, getRandomInteger(0, 120)));
mainNavigationElement.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`History`, `History`, getRandomInteger(0, 120)));
mainNavigationElement.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`Watchlist`, `Watchlist`, getRandomInteger(0, 120)));
mainNavigationElement.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`All`, `All movies`, 0, true));

navigationElements = mainNavigationElement.querySelectorAll(`.main-navigation__item`);
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
