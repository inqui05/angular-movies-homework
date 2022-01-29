import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import SharedModule from '../shared/shared.module';
import HeaderComponent from './components/header/header.component';
import SearchComponent from './components/search/search.component';

@NgModule({
  declarations: [HeaderComponent, SearchComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [HeaderComponent],
})
export default class CoreModule {}
