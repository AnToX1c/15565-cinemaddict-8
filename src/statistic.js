import createElement from './create-element.js';
import Component from './component.js';
import getChart from './get-chart.js';
import moment from 'moment';

class Statistic extends Component {
  constructor(data) {
    super();
    this._movies = data;
    this._allMovies = data;
    this._genre = [];

    this._filterName = `All time`;
    this._onClick = null;
    this._genresChartData = null;
    this._showStatByPeriod = this._showStatByPeriod.bind(this);
  }

  _countWatchedMovies(array) {
    return array.map((el) => el.isWatched).filter(Boolean).length;
  }

  _countTotalDuration(array) {
    return array.map((el) => el.runtime).reduce((total, el) => total + el);
  }

  _countGenres(array) {
    return array.reduce(function (acc, curr) {
      if (curr.length > 0) {
        curr.forEach((value) => {
          if (acc.hasOwnProperty(value)) {
            acc[value]++;
          } else {
            acc[value] = 1;
          }
        });
      }
      return acc;
    }, []);
  }

  _getTopGenre(array) {
    this._genre = this._countGenres(array.map((el) => el.genre));
    const genreTitle = Object.keys(this._genre);
    const genreAmount = Object.values(this._genre);
    const maxAmountID = genreAmount.indexOf(Math.max(...genreAmount));
    return genreTitle[maxAmountID];
  }

  _getChart() {
    const statisticCtx = this._element.querySelector(`.statistic__chart`).getContext(`2d`);
    this._genresChartData = getChart(statisticCtx, this._genre);
  }

  _filterMoviesByPeriod(watchingPeriod) {
    switch (watchingPeriod.trim()) {
      case `All time`:
        return this._allMovies;

      case `Today`:
        return this._allMovies.filter((movie) => moment(movie.watchingDate).isAfter(moment().startOf(`day`)));

      case `Week`:
        return this._allMovies.filter((movie) => moment(movie.watchingDate).isAfter(moment().subtract(7, `days`)));

      case `Month`:
        return this._allMovies.filter((movie) => moment(movie.watchingDate).isAfter(moment().subtract(1, `months`)));

      case `Year`:
        return this._allMovies.filter((movie) => moment(movie.watchingDate).isAfter(moment().subtract(1, `years`)));
    }
    return this._allMovies;
  }

  _showStatByPeriod(evt) {
    evt.preventDefault();
    this._filterName = evt.target.firstChild.data;
    this._movies = this._filterMoviesByPeriod(this._filterName);
    this._updateStat();
  }

  _updateStat() {
    this.unbind();
    this.unrender();
    this._onClick(this.render());
  }

  set onFilterClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `<section class="statistic">
      <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${this._filterName === `All time` ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${this._filterName === `Today` ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${this._filterName === `Week` ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${this._filterName === `Month` ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${this._filterName === `Year` ? `checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${this._countWatchedMovies(this._movies)} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${moment.duration({"minutes": this._countTotalDuration(this._movies)}).hours()} <span class="statistic__item-description">h</span> ${moment.duration({"minutes": this._countTotalDuration(this._movies)}).minutes()} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${this._getTopGenre(this._movies)}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    this._getChart();
    return this._element;
  }

  bind() {
    this._element.querySelector(`.statistic__filters`).addEventListener(`click`, this._showStatByPeriod);
  }
}

export default Statistic;
