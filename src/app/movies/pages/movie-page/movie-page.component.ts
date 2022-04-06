import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IMoviesActors } from 'src/app/shared/models/movies-actors.model';
import { IMoviesImages } from 'src/app/shared/models/movies-images.model';
import { IMoviesInfo } from 'src/app/shared/models/movies-info.model';
import { IMoviesRecommendations } from 'src/app/shared/models/movies-recommendations.model';
import HttpService from 'src/app/shared/services/http.service';
import LanguageService from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export default class MoviePageComponent implements OnInit, OnDestroy {
  public isAllList = false;

  public movieInfo$: Observable<IMoviesInfo> = new Observable<IMoviesInfo>();

  public movieActors$: Observable<IMoviesActors> = new Observable<IMoviesActors>();

  public movieImages$: Observable<IMoviesImages> = new Observable<IMoviesImages>();

  public movieRecommenadions$: Observable<IMoviesRecommendations> = new Observable<IMoviesRecommendations>();

  private subscription: Subscription = new Subscription();

  constructor(private http: HttpService, private langService: LanguageService) { }

  ngOnInit() {
    this.subscription = this.langService.$language.subscribe((lang) => {
      this.movieInfo$ = this.http.getMoviesInfo(634649, lang);
      this.movieActors$ = this.http.getMoviesActors(634649, lang);
      this.movieImages$ = this.http.getMoviesImages(634649);
      this.movieRecommenadions$ = this.http.getMoviesRecommendations(634649, lang);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public showAndHideAllCast(): void {
    this.isAllList = !this.isAllList;
  }
}
