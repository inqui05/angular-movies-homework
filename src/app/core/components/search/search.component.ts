import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime, distinctUntilChanged, filter, map, Subscription,
} from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchComponent implements OnInit, OnDestroy {
  public keyUp = new Subject<KeyboardEvent>();

  public subscriptions: Subscription[] = [];

  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router) {
    this.searchForm = fb.group({
      search: '',
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.keyUp
      .pipe(
        map((event): string => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        filter((value: string): boolean => value.length >= 4),
        debounceTime(800),
      ).subscribe((phrase) => {
        this.route.navigate(['search/', phrase]);
        this.searchForm.reset();
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
