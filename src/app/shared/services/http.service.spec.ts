import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import SharedModule from '../shared.module';

import HttpService from './http.service';
import { ISearchResponse } from '../models/search-response.model';
import { INITIAL_PARAMS, API_URL } from '../vars/vars';

/* eslint-disable */
import { environment } from '../../../environments/environment';
/* eslint-enable */
import { IMoviesInfo } from '../models/movies-info.model';
import { IMoviesImages } from '../models/movies-images.model';
import { IMoviesActors } from '../models/movies-actors.model';
import { IMoviesRecommendations } from '../models/movies-recommendations.model';
import { IPerson } from '../models/person.model';
import { IPersonImages } from '../models/person-images.modes';
import { IPersonMovies } from '../models/person-movies.model';
import { IGenres } from '../models/genres.model';

describe('HttpService', () => {
  let service: HttpService;

  let httpTestingController: HttpTestingController;

  const params = INITIAL_PARAMS();

  const URL = API_URL();

  const id = 1;

  const msg = '404 error';

  const requestData: ISearchResponse = {
    page: 1,
    results: [{} as any, {} as any],
    total_pages: 1,
    total_results: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [SharedModule, HttpClientTestingModule],
    });
    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected the list of movies data called once', () => {
    service.getMovies(params).subscribe((response) => {
      expect(response).toBe(requestData);
    });

    const req = httpTestingController.expectOne(`${URL}movie/${params.category}`
      + `?api_key=${environment.MOVIESDBKEY}&language=${params.language}&page=${params.page}`);

    expect(req.request.method).toBe('GET');

    req.flush(requestData);
  });

  it('should return an error of getting the list of movies when the server returns a 404', () => {
    service.getMovies(params).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}movie/${params.category}`
      + `?api_key=${environment.MOVIESDBKEY}&language=${params.language}&page=${params.page}`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return expected movie\'s information called once', () => {
    const data: IMoviesInfo = {} as any;

    service.getMoviesInfo(id, params.language).subscribe((response) => {
      expect(response).toBe(data);
    });

    const req = httpTestingController.expectOne(`${URL}movie/${id}`
      + `?api_key=${environment.MOVIESDBKEY}&language=${params.language}`);

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });

  it('should return an error of getting movie\'s information when the server returns a 404', () => {
    service.getMoviesInfo(id, params.language).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}movie/${id}`
      + `?api_key=${environment.MOVIESDBKEY}&language=${params.language}`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return expected movie\'s screenshots called once', () => {
    const data: IMoviesImages = {} as any;

    service.getMoviesImages(id).subscribe((response) => {
      expect(response).toBe(data);
    });

    const req = httpTestingController.expectOne(`${URL}movie/${id}/images?api_key=${environment.MOVIESDBKEY}`);

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });

  it('should return an error of getting movie\'s screenshots when the server returns a 404', () => {
    service.getMoviesImages(id).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}movie/${id}/images?api_key=${environment.MOVIESDBKEY}`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return expected movie\'s actors called once', () => {
    const data: IMoviesActors = {} as any;

    service.getMoviesActors(id, params.language).subscribe((response) => {
      expect(response).toBe(data);
    });

    const req = httpTestingController.expectOne(`${URL}movie/${id}/credits?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });

  it('should return an error of getting movie\'s actors when the server returns a 404', () => {
    service.getMoviesActors(id, params.language).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}movie/${id}/credits?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return expected movie\'s recommendations called once', () => {
    const data: IMoviesRecommendations = {} as any;

    service.getMoviesRecommendations(id, params.language).subscribe((response) => {
      expect(response).toBe(data);
    });

    const req = httpTestingController.expectOne(`${URL}movie/${id}/recommendations?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });

  it('should return an error of getting movie\'s recommendations when the server returns a 404', () => {
    service.getMoviesRecommendations(id, params.language).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}movie/${id}/recommendations?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return expected person\'s information called once', () => {
    const data: IPerson = {} as any;

    service.getPersonInfo(id, params.language).subscribe((response) => {
      expect(response).toBe(data);
    });

    const req = httpTestingController.expectOne(`${URL}person/${id}?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });

  it('should return an error of getting person\'s information when the server returns a 404', () => {
    service.getPersonInfo(id, params.language).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}person/${id}?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return expected person\'s photos called once', () => {
    const data: IPersonImages = {} as any;

    service.getPersonImages(id).subscribe((response) => {
      expect(response).toBe(data);
    });

    const req = httpTestingController.expectOne(`${URL}person/${id}/images?api_key=${environment.MOVIESDBKEY}`);

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });

  it('should return an error of getting person\'s photos when the server returns a 404', () => {
    service.getPersonImages(id).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}person/${id}/images?api_key=${environment.MOVIESDBKEY}`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return expected movies where person acted called once', () => {
    const data: IPersonMovies = {} as any;

    service.getPersonMovies(id, params.language).subscribe((response) => {
      expect(response).toEqual(data);
    });

    const req = httpTestingController.expectOne(`${URL}person/${id}/movie_credits?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('should return 10 movies if there are more and throw the movies with one category away', () => {
    const hasLowRating = { vote_average: 3.8, genre_ids: [18, 28] } as any;
    const hasOneCategory = { vote_average: 9.6, genre_ids: [18] } as any;
    const data: IPersonMovies = {} as any;
    data.cast = [
      hasLowRating,
      { vote_average: 4.8, genre_ids: [18, 28] } as any,
      { vote_average: 5.8, genre_ids: [18, 28] } as any,
      { vote_average: 6.8, genre_ids: [18, 28] } as any,
      { vote_average: 7.8, genre_ids: [18, 28] } as any,
      { vote_average: 8.8, genre_ids: [18, 28] } as any,
      { vote_average: 9.8, genre_ids: [18, 28] } as any,
      hasOneCategory,
      { vote_average: 6.6, genre_ids: [18, 28] } as any,
      { vote_average: 7.6, genre_ids: [18, 28] } as any,
      { vote_average: 5.2, genre_ids: [18, 28] } as any,
      { vote_average: 6.2, genre_ids: [18, 28] } as any,
    ];

    service.getPersonMovies(id, params.language).subscribe((response) => {
      expect(response.cast.length).toBe(10);
      expect(response.cast).not.toContain(hasLowRating);
      expect(response.cast).not.toContain(hasOneCategory);
    });

    const req = httpTestingController.expectOne(`${URL}person/${id}/movie_credits?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('should return an error of getting movies where person acted when the server returns a 404', () => {
    service.getPersonMovies(id, params.language).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}person/${id}/movie_credits?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return expected site\'s genres called once', () => {
    const data: IGenres = {} as any;

    service.getGenres(params.language).subscribe((response) => {
      expect(response).toBe(data);
    });

    const req = httpTestingController.expectOne(`${URL}genre/movie/list?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('should return an error of getting site\'s genres when the server returns a 404', () => {
    service.getGenres(params.language).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}genre/movie/list?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return expected movies which user searched called once', () => {
    service.searchMovie(params).subscribe((response) => {
      expect(response).toBe(requestData);
    });

    const req = httpTestingController.expectOne(`${URL}search/movie?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}&query=${params.category}&page=${params.page}&include_adult=false`);

    expect(req.request.method).toBe('GET');
    req.flush(requestData);
  });

  it('should return an error of searching movies when the server returns a 404', () => {
    service.searchMovie(params).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(404);
        expect(error.error).withContext('message').toEqual(msg);
      },
    });

    const req = httpTestingController.expectOne(`${URL}search/movie?api_key=${environment.MOVIESDBKEY}`
      + `&language=${params.language}&query=${params.category}&page=${params.page}&include_adult=false`);

    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });
});
