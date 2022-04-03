export interface IPersonMovies {
  'cast': ICast[],
  'crew': ICrew[],
  'id': number
}

interface ICast {
  'video': boolean,
  'vote_average': number,
  'id': number,
  'overview': string,
  'release_date': Date,
  'adult': boolean,
  'backdrop_path': string,
  'vote_count': number,
  'genre_ids': number[],
  'title': string,
  'original_language': string,
  'original_title': string,
  'poster_path': string,
  'popularity': number,
  'character': string,
  'credit_id': string,
  'order': number
}

interface ICrew {
  'adult': boolean,
  'backdrop_path': string,
  'genre_ids': number[],
  'id': number,
  'original_language': string,
  'original_title': string,
  'overview': string,
  'poster_path': string,
  'release_date': Date,
  'title': string,
  'video': boolean,
  'vote_average': number,
  'vote_count': number,
  'popularity': number,
  'credit_id': string,
  'department': string,
  'job': string
}
