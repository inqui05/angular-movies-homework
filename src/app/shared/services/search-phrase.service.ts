import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class SearchPhraseService {
  public $searchPhrase: Subject<string>;

  constructor() {
    this.$searchPhrase = new Subject<string>();
  }
}
