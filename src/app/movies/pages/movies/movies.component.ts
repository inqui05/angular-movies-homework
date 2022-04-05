import {
  Component, OnDestroy, OnInit,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import IData from 'src/app/shared/models/data-for-response.model';
import { ISearchResponse } from 'src/app/shared/models/search-response.model';
import HttpService from 'src/app/shared/services/http.service';
import LanguageService from 'src/app/shared/services/language.service';

const PAGE_ON_PAGE_BY_DEFAULT = 1;

const DEFAULT_SETTING: IData = {
  category: 'popular',
  language: 'en',
  page: PAGE_ON_PAGE_BY_DEFAULT,
};

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export default class MoviesComponent implements OnInit, OnDestroy {
  private dataForRequest: IData = DEFAULT_SETTING;

  private subscription: Subscription[] = [];

  public setPagination = PAGE_ON_PAGE_BY_DEFAULT;

  public movies$: Observable<ISearchResponse> = new Observable<ISearchResponse>();

  constructor(private service: HttpService, private langService: LanguageService) { }

  ngOnInit() {
    this.getPagesCount();
    this.movies$ = this.service.getMovies(this.dataForRequest);
    this.subscription.push(this.langService.$language.subscribe((lang) => {
      this.dataForRequest.language = lang;
      this.movies$ = this.service.getMovies(this.dataForRequest);
    }));
  }

  public currentCategory(category: string): void {
    this.dataForRequest.category = category;
    this.movies$ = this.service.getMovies(this.dataForRequest);
    this.getPagesCount();
  }

  public currentPage(page: string): void {
    this.dataForRequest.page = +page;
    this.movies$ = this.service.getMovies(this.dataForRequest);
  }

  private getPagesCount(): void {
    this.subscription.push(this.service.getMovies(this.dataForRequest).subscribe((data) => {
      this.setPagination = data.total_pages;
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
