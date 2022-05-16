import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import MaterialModule from './material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, HttpClientModule, BrowserAnimationsModule],
  exports: [MaterialModule, HttpClientModule],
})
export default class SharedModule {}
