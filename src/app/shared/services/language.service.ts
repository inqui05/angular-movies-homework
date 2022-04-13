import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const LANGUAGE_BY_DEFAULT = 'en';

@Injectable({
  providedIn: 'root',
})
export default class LanguageService {
  $language: BehaviorSubject<string>;

  constructor() {
    this.$language = new BehaviorSubject<string>(LANGUAGE_BY_DEFAULT);
  }
}
