import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { IPersonImages } from 'src/app/shared/models/person-images.modes';
import { IPersonMovies } from 'src/app/shared/models/person-movies.model';
import { IPerson } from 'src/app/shared/models/person.model';
import HttpService from 'src/app/shared/services/http.service';
import LanguageService from 'src/app/shared/services/language.service';

const MAX_COUNT_OF_MOVIES_ON_PAGE = 10;
const MAX_COUNT_OF_PHOTO_ON_PAGE = 5;

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.scss'],
})
export default class ActorPageComponent implements OnInit, OnDestroy {
  public actorInfo$: Observable<IPerson> = new Observable<IPerson>();

  public actorImages$: Observable<IPersonImages> = new Observable<IPersonImages>();

  public actorMovies$: Observable<IPersonMovies> = new Observable<IPersonMovies>();

  private subscription: Subscription = new Subscription();

  constructor(private http: HttpService, private langService: LanguageService) { }

  ngOnInit() {
    this.subscription = this.langService.$language.subscribe((lang) => {
      this.actorInfo$ = this.http.getPersonInfo(6384, lang);

      this.actorImages$ = this.http.getPersonImages(6384).pipe(
        map((data: IPersonImages) => {
          const newData = { ...data };
          newData.profiles = data.profiles.slice(0, MAX_COUNT_OF_PHOTO_ON_PAGE);
          return newData;
        }),
      );

      this.actorMovies$ = this.http.getPersonMovies(6384, lang).pipe(
        map((data: IPersonMovies) => {
          data.cast.sort((a, b) => b.vote_average - a.vote_average);
          return data;
        }),
        map((data: IPersonMovies) => {
          const changedData = { ...data };
          changedData.cast = data.cast.filter((element) => element.genre_ids.length > 1)
            .slice(0, MAX_COUNT_OF_MOVIES_ON_PAGE);
          return changedData;
        }),
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
