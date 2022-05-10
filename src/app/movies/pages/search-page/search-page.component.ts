import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import IData from 'src/app/shared/models/data-for-response.model';
import { ISearchResponse } from 'src/app/shared/models/search-response.model';
import HttpService from 'src/app/shared/services/http.service';
import LanguageService from 'src/app/shared/services/language.service';
import { INITIAL_PARAMS } from 'src/app/shared/vars/vars';

const PAGE_NUMBER_BY_DEFAULT = 1;

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent implements OnInit, OnDestroy {
  private dataForRequest: IData = INITIAL_PARAMS();

  public moviesData: ISearchResponse | null = null;

  public setPagination = PAGE_NUMBER_BY_DEFAULT;

  private subscriptions: Subscription[] = [];

  constructor(
    private service: HttpService,
    private langService: LanguageService,
    private router: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.router.params.subscribe((params) => {
      this.dataForRequest.category = params['id'];
      this.subscriptions.push(this.langService.$language.subscribe((lang) => {
        this.dataForRequest.language = lang;
        this.getNewData();
      }));
    }));
  }

  public currentPage(page: string): void {
    this.dataForRequest.page = +page;
    this.getNewData();
  }

  public getNewData() {
    this.subscriptions.push(this.service.searchMovie(this.dataForRequest).subscribe((data) => {
      this.moviesData = data;
      this.setPagination = data.total_pages;
      this.cdr.markForCheck();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
