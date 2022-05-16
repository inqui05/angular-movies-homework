import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import IMovie from 'src/app/shared/models/movies.model';
import { ICast } from 'src/app/shared/models/person-movies.model';
import HttpService from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardComponent implements OnInit, OnDestroy {
  @Input() cardData: IMovie | ICast | null = null;

  public genres: string[] = [];

  public subscription: Subscription[] = [];

  constructor(private http: HttpService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription.push(this.http.allGenres$.subscribe((genres) => {
      if (this.cardData && genres.genres.length) {
        this.genres = [];
        this.cardData.genre_ids.forEach((id) => {
          const element = genres.genres.find((item) => item.id === id);
          if (element) {
            this.genres.push(element.name);
          }
        });
        this.cdr.markForCheck();
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
