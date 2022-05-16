import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component, OnDestroy, OnInit,
} from '@angular/core';

import { Subscription } from 'rxjs';
import IData from 'src/app/shared/models/data-for-response.model';
import { ISearchResponse } from 'src/app/shared/models/search-response.model';
import HttpService from 'src/app/shared/services/http.service';
import LanguageService from 'src/app/shared/services/language.service';
import { INITIAL_PARAMS } from 'src/app/shared/vars/vars';

const PAGE_NUMBER_BY_DEFAULT = 1;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MoviesComponent implements OnInit, OnDestroy {
  private dataForRequest: IData = INITIAL_PARAMS();

  private subscriptions: Subscription[] = [];

  public moviesData: ISearchResponse | null = null;

  public setPagination = PAGE_NUMBER_BY_DEFAULT;

  /* Lately the API has given a different total_pages value depending on the requested page
  and it breaks the paginator. It's the reason why an additional check was added. */
  private lastCategory = '';

  constructor(
    private service: HttpService,
    private langService: LanguageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.langService.$language.subscribe((lang) => {
      this.dataForRequest.language = lang;
      this.getNewData();
    }));
  }

  public currentCategory(category: string): void {
    this.dataForRequest.category = category;
    this.getNewData();
  }

  public currentPage(page: string): void {
    this.dataForRequest.page = +page;
    this.getNewData();
  }

  public getNewData() {
    this.subscriptions.push(this.service.getMovies(this.dataForRequest).subscribe((data) => {
      this.moviesData = data;
      // an additional check
      if (this.lastCategory !== this.dataForRequest.category) {
        this.lastCategory = this.dataForRequest.category;
        this.setPagination = data.total_pages;
      }

      this.cdr.markForCheck();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
