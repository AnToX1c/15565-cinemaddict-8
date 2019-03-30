const filterCaptions = [`All movies`, `Watchlist`, `History`, `Favorites`];
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getFilter = (i) => ({
  caption: filterCaptions[i],
  amount: getRandomInteger(0, 120),
  isActive: false,
});

export default getFilter;
