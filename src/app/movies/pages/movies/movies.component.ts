import {
  Component, OnDestroy, OnInit,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import IData from 'src/app/shared/models/data-for-response.model';
import { ISearchResponse } from 'src/app/shared/models/search-response.model';
import HttpService from 'src/app/shared/services/http.service';
import LanguageService from 'src/app/shared/services/language.service';
import SearchPhraseService from 'src/app/shared/services/search-phrase.service';
import { INITIAL_PARAMS } from 'src/app/shared/vars/vars';

const PAGE_NUMBER_BY_DEFAULT = 1;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export default class MoviesComponent implements OnInit, OnDestroy {
  private dataForRequest: IData = INITIAL_PARAMS();

  private subscription: Subscription[] = [];

  public setPagination = PAGE_NUMBER_BY_DEFAULT;

  public movies$: Observable<ISearchResponse> = new Observable<ISearchResponse>();

  private isSearch = false;

  constructor(
    private service: HttpService,
    private langService: LanguageService,
    private search: SearchPhraseService,
  ) {}

  ngOnInit() {
    this.getPagesCount();
    this.movies$ = this.service.getMovies(this.dataForRequest);
    this.subscription.push(this.langService.$language.subscribe((lang) => {
      this.dataForRequest.language = lang;
      this.getNewData();
    }));
    this.subscription.push(this.search.$searchPhrase.subscribe((phrase) => {
      this.isSearch = true;
      this.currentCategory(phrase);
    }));
  }

  public currentCategory(category: string, notSearch?: boolean): void {
    this.dataForRequest.category = category;
    if (notSearch) this.isSearch = false;
    this.getNewData();
    this.getPagesCount();
  }

  public currentPage(page: string): void {
    this.dataForRequest.page = +page;
    this.getNewData();
  }

  private getPagesCount(): void {
    if (this.isSearch) {
      this.subscription.push(this.service.searchMovie(this.dataForRequest).subscribe((data) => {
        this.setPagination = data.total_pages;
      }));
    } else {
      this.subscription.push(this.service.getMovies(this.dataForRequest).subscribe((data) => {
        this.setPagination = data.total_pages;
      }));
    }
  }

  private getNewData() {
    if (!this.isSearch) {
      this.movies$ = this.service.getMovies(this.dataForRequest);
    } else {
      this.movies$ = this.service.searchMovie(this.dataForRequest);
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
