class ModelFilm {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`] || ``;
    this.originalTitle = data[`film_info`][`alternative_title`] || ``;
    this.totalRating = data[`film_info`][`total_rating`];
    this.poster = data[`film_info`][`poster`] || ``;
    this.ageRating = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`] || ``;
    this.writers = data[`film_info`][`writers`] || [];
    this.actors = data[`film_info`][`actors`] || [];
    this.release = new Date(data[`film_info`][`release`][`date`]);
    this.releaseCountry = data[`film_info`][`release`][`release_country`] || ``;
    this.runtime = data[`film_info`][`runtime`];
    this.genre = data[`film_info`][`genre`] || [];
    this.description = data[`film_info`][`description`] || ``;
    this.personalRating = data[`user_details`][`personal_rating`];
    this.comments = data[`comments`] || [];
    this.isWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.isWatched = Boolean(data[`user_details`][`already_watched`]);
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);
  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'title': this.title,
        'alternative_title': this.originalTitle,
        'total_rating': this.totalRating,
        'poster': this.poster,
        'age_rating': this.ageRating,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.release,
          'release_country': this.releaseCountry
        },
        'runtime': this.runtime,
        'genre': this.genre,
        'description': this.description
      },
      'user_details': {
        'personal_rating': this.personalRating,
        'watchlist': this.isWatchlist,
        'already_watched': this.isWatched,
        'favorite': this.isFavorite,
        'watching_date': this.watchingDate
      },
      'comments': this.comments
    };
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}

export default ModelFilm;
