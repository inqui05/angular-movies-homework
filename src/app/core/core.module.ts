import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import SharedModule from '../shared/shared.module';
import HeaderComponent from './components/header/header.component';
import SearchComponent from './components/search/search.component';
import LanguageSwitcherComponent from './components/language-switcher/language-switcher.component';

@NgModule({
  declarations: [HeaderComponent, SearchComponent, LanguageSwitcherComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule],
  exports: [HeaderComponent],
})
export default class CoreModule {}
