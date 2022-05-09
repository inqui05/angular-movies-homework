import { HTTP_INTERCEPTORS } from '@angular/common/http';
import CatchHttpErrorsInterceptor from '../interceptors/catch-http-errors.interceptor';
import LoaderInterceptor from '../interceptors/loader.interceptor';
import IData from '../models/data-for-response.model';

const PAGE_NUMBER_BY_DEFAULT = 1;

const INITIAL_PARAMS = (): IData => ({
  category: 'popular',
  language: 'en',
  page: PAGE_NUMBER_BY_DEFAULT,
});

const API_URL = (): string => 'https://api.themoviedb.org/3/';

const INTERCEPTORS_PROVIDERS = () => [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchHttpErrorsInterceptor,
    multi: true,
  },
];

export { INITIAL_PARAMS, API_URL, INTERCEPTORS_PROVIDERS };
