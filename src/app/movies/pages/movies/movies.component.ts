import { Component } from '@angular/core';
import { IPagination } from '../../models/pagination.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export default class MoviesComponent {
  public CARDS_ON_PAGE_BY_DAFAULT = 20;

  // TODO: remove magic numbers
  setPagination: IPagination = { itemsCount: 150, pageSize: this.CARDS_ON_PAGE_BY_DAFAULT };

  constructor() {
    const { width } = window.screen;

    if (width >= 822 && width <= 1239) {
      this.CARDS_ON_PAGE_BY_DAFAULT = 21;
    }
  }
}
