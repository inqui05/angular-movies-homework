import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import IMovie from 'src/app/shared/models/movies.model';
import { ICast } from 'src/app/shared/models/person-movies.model';
import HttpService from 'src/app/shared/services/http.service';

const defaultLang = 'en';

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

  constructor(private service: HttpService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription.push(this.service.getGenres(defaultLang).subscribe((data) => {
      if (this.cardData) {
        this.cardData.genre_ids.forEach((id) => {
          const element = data.genres.find((item) => item.id === id);
          if (element) {
            this.genres.push(element.name);
            this.cdr.markForCheck();
          }
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
