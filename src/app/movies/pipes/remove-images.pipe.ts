import { Pipe, PipeTransform } from '@angular/core';
import { IMoviesImages } from 'src/app/shared/models/movies-images.model';

@Pipe({
  name: 'removeImages',
})
export default class RemoveImagesPipe implements PipeTransform {
  private maxLenght = 8;

  transform(images: IMoviesImages): IMoviesImages {
    if (images.backdrops.length > this.maxLenght) {
      const arr = images.backdrops.slice(0, this.maxLenght);
      const newImages = { ...images };
      newImages.backdrops = arr;
      return newImages;
    }
    return images;
  }
}
