import {
  Directive, HostBinding, Input, OnInit,
} from '@angular/core';

export enum AvailableColor {
  Green = 'rgb(51, 204, 51)',
  Orange = 'rgb(237, 118, 14)',
  Gray = 'gray',
  Red = 'red',
}

@Directive({
  selector: '[appViewerRating]',
})
export default class ViewerRatingDirective implements OnInit {
  @Input('appViewerRating') rating = 0;

  @HostBinding('style.backgroundColor') bottomBorderColor = AvailableColor.Red;

  ngOnInit(): void {
    if (this.rating >= 7) {
      this.bottomBorderColor = AvailableColor.Green;
    } else if (this.rating >= 6) {
      this.bottomBorderColor = AvailableColor.Orange;
    } else if (this.rating >= 4.5) {
      this.bottomBorderColor = AvailableColor.Gray;
    } else if (this.rating < 4.5) {
      this.bottomBorderColor = AvailableColor.Red;
    }
  }
}
