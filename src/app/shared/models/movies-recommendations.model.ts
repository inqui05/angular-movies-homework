export interface IMoviesRecommendations {
  'page': number,
  'results': IMovie[],
  'total_pages': number,
  'total_results': number
}

interface IMovie {
  'adult': boolean,
  'backdrop_path': string,
  'genre_ids': number[],
  'id': number,
  'media_type': string,
  'title': string,
  'original_language': string,
  'original_title': string,
  'overview': string,
  'popularity': number,
  'poster_path': string,
  'release_date': Date,
  'video': boolean,
  'vote_average': number,
  'vote_count': number
}
