import RemoveImagesPipe from './remove-images.pipe';
import { IMoviesImages } from '../../shared/models/movies-images.model';

describe('RemoveImagesPipe', () => {
  let pipe: RemoveImagesPipe;

  beforeEach(() => {
    pipe = new RemoveImagesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('shuold return new IMoviesImages object with the value of key \'backdrops\' <= 8', () => {
    const moreThanEight: IMoviesImages = {
      id: 1,
      backdrops: [
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any,
        {} as any,
      ],
      logos: [],
      posters: [],
    };
    const lessThanEight: IMoviesImages = {
      id: 1,
      backdrops: [{} as any, {} as any, {} as any],
      logos: [],
      posters: [],
    };

    expect(pipe.transform(moreThanEight).backdrops.length).toBe(8);
    expect(pipe.transform(lessThanEight).backdrops.length).toBe(3);
  });
});
