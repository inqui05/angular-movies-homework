import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IPersonImages } from 'src/app/shared/models/person-images.modes';
import { IPersonMovies } from 'src/app/shared/models/person-movies.model';
import { IPerson } from 'src/app/shared/models/person.model';
import HttpService from 'src/app/shared/services/http.service';
import LanguageService from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActorPageComponent implements OnInit, OnDestroy {
  public actorInfo$: Observable<IPerson> = new Observable<IPerson>();

  public actorImages$: Observable<IPersonImages> = new Observable<IPersonImages>();

  public actorMovies$: Observable<IPersonMovies> = new Observable<IPersonMovies>();

  private subscription: Subscription[] = [];

  constructor(private http: HttpService, private langService: LanguageService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.subscription.push(this.router.params.subscribe((params) => {
      this.subscription.push(this.langService.$language.subscribe((lang) => {
        this.actorInfo$ = this.http.getPersonInfo(params['id'], lang);
        this.actorImages$ = this.http.getPersonImages(params['id']);
        this.actorMovies$ = this.http.getPersonMovies(params['id'], lang);
      }));
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
