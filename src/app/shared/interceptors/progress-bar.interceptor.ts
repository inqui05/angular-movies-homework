import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import LoaderService from '../services/progress-bar.service';

@Injectable()
export default class LoaderInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.isDisplayed$.next(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.loader.isDisplayed$.next(false);
      }),
    );
  }
}
