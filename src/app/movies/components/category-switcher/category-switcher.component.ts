import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-category-switcher',
  templateUrl: './category-switcher.component.html',
  styleUrls: ['./category-switcher.component.scss'],
})
export default class CategorySwitcherComponent {
  categoryControl = new FormControl();

  @Output() categoryEvent = new EventEmitter<string>();

  addNewCategory(value: string) {
    this.categoryEvent.emit(value);
  }
}
