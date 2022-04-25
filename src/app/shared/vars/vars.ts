import IData from '../models/data-for-response.model';

const PAGE_NUMBER_BY_DEFAULT = 1;

const INITIAL_PARAMS = (): IData => ({
  category: 'popular',
  language: 'en',
  page: PAGE_NUMBER_BY_DEFAULT,
});

const API_URL = (): string => 'https://api.themoviedb.org/3/';

export { INITIAL_PARAMS, API_URL };
