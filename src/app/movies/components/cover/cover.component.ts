import { Component, Input } from '@angular/core';
import { IMoviesInfo } from 'src/app/shared/models/movies-info.model';
import IMovie from 'src/app/shared/models/movies.model';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export default class CoverComponent {
  @Input() cardData: IMovie | IMoviesInfo | null = null;
}
