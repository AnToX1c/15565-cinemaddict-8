const directors = new Set([
  `Brad Bird`,
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Quentin Tarantino`,
  `Orson Welles`,
  `Francis Ford Coppola`,
  `Ridley Scott`,
  `Akira Kurosawa`,
  `Joel Coen`,
  `Ethan Coen`]);
const writers = new Set([
  `Quentin Tarantino`,
  `Christopher Nolan`,
  `Joel Coen`,
  `Michael Mann`,
  `Martin Scorsese`,
  `Drew Goddard`,
  `Sergio Leone`]);
const actors = new Set([
  `Samuel L. Jackson`,
  `Catherine Keener`,
  `Sophia Bush`,
  `Robert De Niro`,
  `Jack Nicholson`,
  `Marlon Brando`,
  `Tom Hanks`,
  `Humphrey Bogart`,
  `Leonardo DiCaprio`,
  `Johnny Depp`,
  `Al Pacino`,
  `Denzel Washington`,
  `Brad Pitt`,
  `Christian Bale`]);
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
const genres = new Set([
  `Comedy`,
  `Drama`,
  `Crime`,
  `Action`,
  `Detective`,
  `Horror`]);
const ageLimits = [
  `0+`,
  `6+`,
  `13+`,
  `17+`];
const countries = new Set([
  `USA`,
  `Russia`,
  `France`,
  `England`,
  `Italy`,
  `Australia`]);
const getRandomBoolean = () => Math.random() >= 0.5;
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

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
  originalTitle: [
    `Убийство Джесси Джеймса`,
    `Суперсемейка 2`,
    `Американские боги`,
    `Покидая Неверленд`,
    `Холодная война`,
    `Как приручить дракона: Cкрытый мир`,
    `The Highwaymen`,
    `Тройная граница`,
    `Тройной рубеж`,
    `Грязь`,
    `Черное зеркало`,
    `Ирландец`,
    `Аполлон 11`,
    `Зеленая книга`,
    `Сможете ли вы меня простить?`,
    `Девочки Гилмор`][getRandomInteger(0, 15)],
  director: [...directors.keys()][getRandomInteger(0, directors.size)],
  writer: [...writers.keys()][getRandomInteger(0, writers.size)],
  actors: [...actors.keys()].sort(() => 0.5 - Math.random()).slice(0, getRandomInteger(1, 3)),
  description: [...descriptions.keys()].sort(() => 0.5 - Math.random()).slice(0, getRandomInteger(1, 2)),
  duration: getRandomInteger(45, 220),
  images: [
    `./images/posters/accused.jpg`,
    `./images/posters/blackmail.jpg`,
    `./images/posters/blue-blazes.jpg`,
    `./images/posters/fuga-da-new-york.jpg`,
    `./images/posters/moonrise.jpg`,
    `./images/posters/three-friends.jpg`][getRandomInteger(0, 5)],
  rating: (Math.random() * (9.99 - 2.00) + 2.00).toFixed(1),
  genre: [...genres.keys()][getRandomInteger(0, genres.size)],
  ageLimit: ageLimits[getRandomInteger(0, ageLimits.length)],
  releaseDate: getRandomDate(new Date(getRandomInteger(1980, 2019), 0, 1), new Date(getRandomInteger(1980, 2019), 11, 31)),
  commentsNumber: getRandomInteger(1, 53),
  score: getRandomInteger(1, 9),
  country: [...countries.keys()][getRandomInteger(0, countries.size)],
  isWatchlist: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  comment: ``
});

export default getFilmCard;
