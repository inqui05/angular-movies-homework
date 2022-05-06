import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { IMoviesActors } from 'src/app/shared/models/movies-actors.model';
import { IMoviesImages } from 'src/app/shared/models/movies-images.model';
import { IMoviesInfo } from 'src/app/shared/models/movies-info.model';
import { IMoviesRecommendations } from 'src/app/shared/models/movies-recommendations.model';
import HttpService from 'src/app/shared/services/http.service';
import LanguageService from 'src/app/shared/services/language.service';

const MAX_COUNT_OF_MOVIES_ON_PAGE = 5;

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MoviePageComponent implements OnInit, OnDestroy {
  public isAllList = false;

  public movieInfo$: Observable<IMoviesInfo> = new Observable<IMoviesInfo>();

  public movieActors$: Observable<IMoviesActors> = new Observable<IMoviesActors>();

  public movieImages$: Observable<IMoviesImages> = new Observable<IMoviesImages>();

  public movieRecommenadions$: Observable<IMoviesRecommendations> = new Observable<IMoviesRecommendations>();

  private subscription: Subscription[] = [];

  constructor(private http: HttpService, private langService: LanguageService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.subscription.push(this.router.params.subscribe((params) => {
      this.subscription.push(this.langService.$language.subscribe((lang) => {
        this.movieInfo$ = this.http.getMoviesInfo(params['id'], lang);
        this.movieActors$ = this.http.getMoviesActors(params['id'], lang);
        this.movieImages$ = this.http.getMoviesImages(params['id']);
        this.movieRecommenadions$ = this.http.getMoviesRecommendations(params['id'], lang).pipe(
          map((data: IMoviesRecommendations) => {
            const newData = { ...data };
            newData.results = data.results.slice(0, MAX_COUNT_OF_MOVIES_ON_PAGE);
            return newData;
          }),
        );
      }));
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  public showAndHideAllCast(): void {
    this.isAllList = !this.isAllList;
  }
}
