import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import SharedModule from '../shared/shared.module';
import CardComponent from './components/card/card.component';
import CategorySwitcherComponent from './components/category-switcher/category-switcher.component';
import PaginationComponent from './components/pagination/pagination.component';
import MoviesComponent from './pages/movies/movies.component';
import MoviePageComponent from './pages/movie-page/movie-page.component';
import CoverComponent from './components/cover/cover.component';
import PhotoComponent from './components/photo/photo.component';

@NgModule({
  declarations: [MoviesComponent, CategorySwitcherComponent, CardComponent, PaginationComponent,
    MoviePageComponent, CoverComponent, PhotoComponent],
  imports: [CommonModule, SharedModule],
  exports: [MoviesComponent, MoviePageComponent],
})
export default class MoviesModule {}
