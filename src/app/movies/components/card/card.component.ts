import {
  Component, Input, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import IMovie from 'src/app/shared/models/movies.model';
import HttpService from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export default class CardComponent implements OnInit, OnDestroy {
  @Input() cardData: IMovie | null = null;

  public genres: string[] = [];

  private subscription: Subscription[] = [];

  constructor(private service: HttpService) {}

  ngOnInit() {
    const lang = 'en';
    this.service.getGenres(lang).subscribe((data) => {
      if (this.cardData) {
        this.cardData.genre_ids.forEach((id) => {
          const element = data.genres.find((item) => item.id === id);
          if (element) {
            this.genres.push(element.name);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
