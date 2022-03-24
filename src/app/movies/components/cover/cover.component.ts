import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export default class CoverComponent {
  // TODO: change mock number after API requests
  @Input() rating = 7.5;
}
