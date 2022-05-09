import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import ErrorNotificationService from '../services/error-notification.service';

const NOTIFICATION = `The API service of the TMDB doesn't let users from Russia and Belarus get data.
  You should use proxy or VPN!`;

@Injectable()
export default class CatchHttpErrorsInterceptor implements HttpInterceptor {
  constructor(private notification: ErrorNotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: Error) => {
        this.notification.show(`${error.name} - ${NOTIFICATION}`);
        return throwError(() => new Error());
      }),
    );
  }
}
