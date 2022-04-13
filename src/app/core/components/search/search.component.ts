import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime, distinctUntilChanged, filter, map, Subscription,
} from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import SearchPhraseService from 'src/app/shared/services/search-phrase.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export default class SearchComponent implements OnInit, OnDestroy {
  public keyUp = new Subject<KeyboardEvent>();

  private subscription = new Subscription();

  constructor(private search: SearchPhraseService) {}

  ngOnInit() {
    this.subscription = this.keyUp
      .pipe(
        map((event): string => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        filter((value: string): boolean => value.length >= 4),
        debounceTime(800),
      ).subscribe((phrase) => this.search.$searchPhrase.next(phrase));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
