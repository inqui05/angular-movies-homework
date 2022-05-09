import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import CoreModule from './core/core.module';
import MoviesModule from './movies/movies.module';
import TranslocoRootModule from './transloco-root.module';
import { INTERCEPTORS_PROVIDERS } from './shared/vars/vars';

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
  providers: [INTERCEPTORS_PROVIDERS()],
  bootstrap: [AppComponent],
})
export default class AppModule {}
