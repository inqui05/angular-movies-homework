import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
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

const URL = 'https://api.themoviedb.org/3/';

@Injectable({
  providedIn: 'root',
})
export default class HttpService {
  constructor(private http: HttpClient) { }

  getMovies(data: IData): Observable<ISearchResponse> {
    return this.http.get<ISearchResponse>(
      `${URL}movie/${data.category}?api_key=${environment.MOVIESDBKEY}&language=${data.language}&page=${data.page}`,
    );
  }

  getMoviesInfo(id: number, language: string): Observable<IMoviesInfo> {
    return this.http.get<IMoviesInfo>(`${URL}movie/${id}?api_key=${environment.MOVIESDBKEY}&language=${language}`);
  }

  getMoviesImages(id: number): Observable<IMoviesImages> {
    return this.http.get<IMoviesImages>(`${URL}movie/${id}/images?api_key=${environment.MOVIESDBKEY}`);
  }

  getMoviesActors(id: number, language: string): Observable<IMoviesActors> {
    return this.http.get<IMoviesActors>(
      `${URL}movie/${id}/credits?api_key=${environment.MOVIESDBKEY}&language=${language}`,
    );
  }

  getMoviesRecommendations(id: number, language: string): Observable<IMoviesRecommendations> {
    return this.http.get<IMoviesRecommendations>(
      `${URL}movie/${id}/recommendations?api_key=${environment.MOVIESDBKEY}&language=${language}`,
    );
  }

  getPersonInfo(id: number, language: string): Observable<IPerson> {
    return this.http.get<IPerson>(`${URL}person/${id}?api_key=${environment.MOVIESDBKEY}&language=${language}`);
  }

  getPersonImages(id: number): Observable<IPersonImages> {
    return this.http.get<IPersonImages>(`${URL}person/${id}/images?api_key=${environment.MOVIESDBKEY}`);
  }

  getPersonMovies(id: number, language: string): Observable<IPersonMovies> {
    return this.http.get<IPersonMovies>(
      `${URL}person/${id}/movie_credits?api_key=${environment.MOVIESDBKEY}&language=${language}`,
    );
  }

  getGenres(language: string): Observable<IGenres> {
    return this.http.get<IGenres>(`${URL}genre/movie/list?api_key=${environment.MOVIESDBKEY}&language=${language}`);
  }
}
