import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moviesDuration',
})
export default class MoviesDurationPipe implements PipeTransform {
  private MINUTES_IN_HOUR = 60;

  transform(minutes: number): string {
    const hours = Math.floor(minutes / this.MINUTES_IN_HOUR).toString();
    return `${hours}:${minutes % this.MINUTES_IN_HOUR}`;
  }
}
