import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import SharedModule from '../shared/shared.module';
import TranslocoRootModule from '../transloco-root.module';
import CardComponent from './components/card/card.component';
import CategorySwitcherComponent from './components/category-switcher/category-switcher.component';
import CoverComponent from './components/cover/cover.component';
import PaginationComponent from './components/pagination/pagination.component';
import PhotoComponent from './components/photo/photo.component';
import ActorPageComponent from './pages/actor-page/actor-page.component';
import MoviePageComponent from './pages/movie-page/movie-page.component';
import MoviesComponent from './pages/movies/movies.component';
import ViewerRatingDirective from './directives/viewer-rating.directive';

@NgModule({
  declarations: [MoviesComponent, CategorySwitcherComponent, CardComponent, PaginationComponent,
    MoviePageComponent, CoverComponent, PhotoComponent, ActorPageComponent, ViewerRatingDirective],
  imports: [CommonModule, SharedModule, TranslocoRootModule, ReactiveFormsModule],
  exports: [MoviesComponent, MoviePageComponent, ActorPageComponent],
})
export default class MoviesModule {}
