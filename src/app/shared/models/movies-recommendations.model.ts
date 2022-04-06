import IMovie from './movies.model';

export interface IMoviesRecommendations {
  'page': number,
  'results': IMovie[],
  'total_pages': number,
  'total_results': number
}
