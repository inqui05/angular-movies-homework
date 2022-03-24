import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export default class MoviePageComponent {
  public isAllList = false;

  public date = new Date();

  public revenue = 10000000;

  public genres: string[] = ['Genre1', 'genre2', 'genre3', 'genre4'];

  public showAndHideAllCast(): void {
    this.isAllList = !this.isAllList;
  }
}
