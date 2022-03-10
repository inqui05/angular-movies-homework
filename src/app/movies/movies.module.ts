import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import SharedModule from '../shared/shared.module';
import CardComponent from './components/card/card.component';
import CategorySwitcherComponent from './components/category-switcher/category-switcher.component';
import PaginationComponent from './components/pagination/pagination.component';
import MoviesComponent from './pages/movies/movies.component';

@NgModule({
  declarations: [MoviesComponent, CategorySwitcherComponent, CardComponent, PaginationComponent],
  imports: [CommonModule, SharedModule],
  exports: [MoviesComponent],
})
export default class MoviesModule {}
