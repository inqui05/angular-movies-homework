import MoviesDurationPipe from './movies-duration.pipe';

// 100 minutes are one hour and 40 minutes
const DEFAULT_DURATION = 100;
const DURATION_IN_HOURS = '1:40';

describe('MoviesDurationPipe', () => {
  let pipe: MoviesDurationPipe;

  beforeEach(() => {
    pipe = new MoviesDurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('shuold return the duration on the movie in \'H:MM\' format', () => {
    expect(pipe.transform(DEFAULT_DURATION)).toBe(DURATION_IN_HOURS);
  });
});
