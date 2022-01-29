import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export default class SearchComponent implements OnInit {
  myControl = new FormControl();

  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];

  filteredOptions: Observable<User[]> | null = null;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this.filter(name) : this.options.slice())),
    );
  }

  // TODO: do it when the service will get data from API
  // eslint-disable-next-line class-methods-use-this
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) => option.name.toLowerCase().includes(filterValue));
  }
}
