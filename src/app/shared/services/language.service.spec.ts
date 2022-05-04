import { TestBed } from '@angular/core/testing';

import LanguageService from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('LanguageService should emit the new language to the stream', () => {
    const newLang = 'bel';
    service.$language.next(newLang);

    service.$language.subscribe((lang) => {
      expect(lang).toBe(newLang);
    });
  });
});
