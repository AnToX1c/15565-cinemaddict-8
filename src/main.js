import renderNavigationItem from './render-navigation-element.js';
import renderCardItem from './render-card-element.js';

const mainNavigationElement = document.querySelector(`.main-navigation`);
const filmListContainer = document.querySelector(`.films-list__container`);
const filmListExtra = document.querySelectorAll(`.films-list--extra .films-list__container`);
const numberOfCards = 7;
const numberOfTopCards = 2;
const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const fillTheCards = (amount) => {
  for (let i = 0; i < amount; i++) {
    filmListContainer.insertAdjacentHTML(`beforeend`, renderCardItem());
  }
};

const clearBoard = () => {
  filmListContainer.innerHTML = ``;
  fillTheCards(randomInteger(1, 10));
};

let navigationElements;

mainNavigationElement.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`Favorites`, `Favorites`, randomInteger(0, 120)));
mainNavigationElement.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`History`, `History`, randomInteger(0, 120)));
mainNavigationElement.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`Watchlist`, `Watchlist`, randomInteger(0, 120)));
mainNavigationElement.insertAdjacentHTML(`afterbegin`, renderNavigationItem(`All`, `All movies`, 0, true));

navigationElements = mainNavigationElement.querySelectorAll(`.main-navigation__item`);
for (let i = 0; i < navigationElements.length; i++) {
  navigationElements[i].onclick = function (evt) {
    evt.preventDefault();
    clearBoard();
  };
}

fillTheCards(numberOfCards);

for (let i = 0; i < filmListExtra.length; i++) {
  for (let j = 0; j < numberOfTopCards; j++) {
    filmListExtra[i].insertAdjacentHTML(`beforeend`, renderCardItem());
  }
}
