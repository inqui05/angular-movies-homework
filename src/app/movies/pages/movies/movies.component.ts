import { Component } from '@angular/core';
import { IPagination } from '../../models/pagination.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export default class MoviesComponent {
  setPagination: IPagination = { itemsCount: 150, pageSize: 15 };
}
