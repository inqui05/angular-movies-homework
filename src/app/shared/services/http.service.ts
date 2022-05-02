import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
/* eslint-disable */
import { environment } from '../../../environments/environment';
/* eslint-enable */
import IData from '../models/data-for-response.model';
import { IGenres } from '../models/genres.model';
import { IMoviesActors } from '../models/movies-actors.model';
import { IMoviesImages } from '../models/movies-images.model';
import { IMoviesInfo } from '../models/movies-info.model';
import { IMoviesRecommendations } from '../models/movies-recommendations.model';
import { IPersonImages } from '../models/person-images.modes';
import { IPersonMovies } from '../models/person-movies.model';
import { IPerson } from '../models/person.model';
import { ISearchResponse } from '../models/search-response.model';
import { API_URL } from '../vars/vars';

const MAX_COUNT_OF_MOVIES_ON_PAGE = 10;
const MAX_COUNT_OF_PHOTO_ON_PAGE = 5;

@Injectable({
  providedIn: 'root',
})
export default class HttpService {
  private URL = API_URL();

  constructor(private http: HttpClient) { }

  getMovies(data: IData): Observable<ISearchResponse> {
    return this.http.get<ISearchResponse>(`${this.URL}movie/${data.category}`
      + `?api_key=${environment.MOVIESDBKEY}&language=${data.language}&page=${data.page}`);
  }

  getMoviesInfo(id: number, language: string): Observable<IMoviesInfo> {
    return this.http.get<IMoviesInfo>(`${this.URL}movie/${id}?api_key=${environment.MOVIESDBKEY}&language=${language}`);
  }

  getMoviesImages(id: number): Observable<IMoviesImages> {
    return this.http.get<IMoviesImages>(`${this.URL}movie/${id}/images?api_key=${environment.MOVIESDBKEY}`);
  }

  getMoviesActors(id: number, language: string): Observable<IMoviesActors> {
    return this.http.get<IMoviesActors>(
      `${this.URL}movie/${id}/credits?api_key=${environment.MOVIESDBKEY}&language=${language}`,
    );
  }

  getMoviesRecommendations(id: number, language: string): Observable<IMoviesRecommendations> {
    return this.http.get<IMoviesRecommendations>(
      `${this.URL}movie/${id}/recommendations?api_key=${environment.MOVIESDBKEY}&language=${language}`,
    );
  }

  getPersonInfo(id: number, language: string): Observable<IPerson> {
    return this.http.get<IPerson>(`${this.URL}person/${id}?api_key=${environment.MOVIESDBKEY}&language=${language}`);
  }

  getPersonImages(id: number): Observable<IPersonImages> {
    return this.http.get<IPersonImages>(`${this.URL}person/${id}/images?api_key=${environment.MOVIESDBKEY}`).pipe(
      map((data: IPersonImages) => {
        const newData = { ...data };
        newData.profiles = data.profiles.slice(0, MAX_COUNT_OF_PHOTO_ON_PAGE);
        return newData;
      }),
    );
  }

  /* I throw the movies with one category away because the stars of popular films are mentioned
  in many documentaries about how the movie was shot and they have a high rating. As a result the most
  of movies aren't exactly what the user expected to see */
  getPersonMovies(id: number, language: string): Observable<IPersonMovies> {
    return this.http.get<IPersonMovies>(
      `${this.URL}person/${id}/movie_credits?api_key=${environment.MOVIESDBKEY}&language=${language}`,
    ).pipe(
      map((data: IPersonMovies) => {
        if (Object.keys(data).length !== 0) data.cast.sort((a, b) => b.vote_average - a.vote_average);
        return data;
      }),
      map((data: IPersonMovies) => {
        const changedData = { ...data };
        if (Object.keys(changedData).length !== 0 && Object.keys(changedData.cast).length !== 0) {
          changedData.cast = data.cast.filter((element) => element.genre_ids.length > 1);
        }
        if (Object.keys(changedData.cast).length !== 0) {
          changedData.cast = changedData.cast.slice(0, MAX_COUNT_OF_MOVIES_ON_PAGE);
        }
        return changedData;
      }),
    );
  }

  getGenres(language: string): Observable<IGenres> {
    return this.http.get<IGenres>(`${this.URL}genre/movie/list`
      + `?api_key=${environment.MOVIESDBKEY}&language=${language}`);
  }

  searchMovie(data: IData): Observable<ISearchResponse> {
    return this.http.get<ISearchResponse>(`${this.URL}search/movie?api_key=${environment.MOVIESDBKEY}`
      + `&language=${data.language}&query=${data.category}&page=${data.page}&include_adult=false`);
  }
}
