import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import CoreModule from './core/core.module';
import MoviesModule from './movies/movies.module';
import TranslocoRootModule from './transloco-root.module';
import LoaderInterceptor from './shared/interceptors/progress-bar.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MoviesModule,
    HttpClientModule,
    TranslocoRootModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export default class AppModule {}
