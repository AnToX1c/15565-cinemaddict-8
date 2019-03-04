const descriptions = new Set([
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`]);
const genres = new Set([`Comedy`, `Drama`, `Crime`, `Action`, `Detective`, `Horror`]);
const getRandomBoolean = () => Math.random() >= 0.5;
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getFilmCard = () => ({
  title: [
    `The Assassination Of Jessie James By The Coward Robert Ford`,
    `Incredibles 2`,
    `American Gods`,
    `Leaving Neverland`,
    `Cold War`,
    `How to Train Your Dragon: The Hidden World`,
    `The Highwaymen`,
    `Triple Frontier`,
    `The Dirt`,
    `Black Mirror`,
    `The Irishman`,
    `Apollo 11`,
    `Green Book`,
    `Can You Ever Forgive Me?`,
    `Gilmore Girls`][getRandomInteger(0, 15)],
  description: [...descriptions.keys()].sort(() => 0.5 - Math.random()).slice(0, getRandomInteger(1, 2)),
  images: [
    `./images/posters/accused.jpg`,
    `./images/posters/blackmail.jpg`,
    `./images/posters/blue-blazes.jpg`,
    `./images/posters/fuga-da-new-york.jpg`,
    `./images/posters/moonrise.jpg`,
    `./images/posters/three-friends.jpg`][getRandomInteger(0, 5)],
  rating: (Math.random() * (9.99 - 2.00) + 2.00).toFixed(1),
  year: getRandomInteger(1980, 2019),
  genre: [...genres.keys()][getRandomInteger(0, genres.size)],
  commentsNumber: getRandomInteger(1, 53),
  isWatchlist: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
});

export default getFilmCard;
