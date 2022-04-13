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
});
