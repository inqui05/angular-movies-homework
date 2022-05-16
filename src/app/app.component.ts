import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import HttpService from './shared/services/http.service';
import LanguageService from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent implements OnInit, OnDestroy {
  title = 'movies';

  public subscription: Subscription[] = [];

  constructor(private lang: LanguageService, private http: HttpService) {}

  ngOnInit() {
    this.subscription.push(
      this.lang.$language.pipe(
        switchMap((lang) => this.http.getGenres(lang)),
      ).subscribe((genres) => this.http.allGenres$.next(genres)),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
