import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import CatchHttpErrorsInterceptor from './catch-http-errors.interceptor';

describe('CatchHttpErrorsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CatchHttpErrorsInterceptor],
    imports: [MatSnackBarModule],
  }));

  it('should be created', () => {
    const interceptor: CatchHttpErrorsInterceptor = TestBed.inject(CatchHttpErrorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
