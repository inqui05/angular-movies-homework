import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import ErrorNotificationService from './error-notification.service';

describe('ErrorNotificationService', () => {
  let service: ErrorNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(ErrorNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
