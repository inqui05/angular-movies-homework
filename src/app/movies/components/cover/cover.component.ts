import { Component, Input } from '@angular/core';
import { IMoviesInfo } from 'src/app/shared/models/movies-info.model';
import IMovie from 'src/app/shared/models/movies.model';
import { ICast } from 'src/app/shared/models/person-movies.model';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export default class CoverComponent {
  @Input() cardData: IMovie | IMoviesInfo | ICast | null = null;
}
