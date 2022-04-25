import { TestBed } from '@angular/core/testing';

import SearchPhraseService from './search-phrase.service';

describe('SearchPhraseService', () => {
  let service: SearchPhraseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPhraseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SearchPhraseService should emit the new search phrase to the stream', () => {
    let result: string = '';
    const newPhrase = 'matrix';

    service.$searchPhrase.subscribe((phrase) => {
      result = phrase;
    });
    service.$searchPhrase.next(newPhrase);

    expect(result).toBe(newPhrase);
  });
});
