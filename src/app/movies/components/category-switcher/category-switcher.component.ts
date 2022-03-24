import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-category-switcher',
  templateUrl: './category-switcher.component.html',
  styleUrls: ['./category-switcher.component.scss'],
})
export default class CategorySwitcherComponent {
  fontStyleControl = new FormControl();
}
