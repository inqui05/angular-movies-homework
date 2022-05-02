import 'zone.js/dist/zone-testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import PaginationComponent from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const MAX_BUTTONS_COUNT = 5;
  const moreThanFive = 100;
  const maxPages = 500;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if there are 5+ pages the pagination element should have 5 numbers when app have started', () => {
    component.lastPage = moreThanFive;
    component.addStartPagesToPagination();

    expect(component.pages.length).toBe(MAX_BUTTONS_COUNT);
    expect(component.pages).toContain(1);
    expect(component.pages).toContain(2);
    expect(component.pages).toContain(3);
    expect(component.pages).toContain(4);
    expect(component.pages).toContain(5);
  });

  it('if there are less than 5 pages the pagination element should have the same numbers when app have started', () => {
    const lessThanFive = 3;
    component.lastPage = lessThanFive;
    component.addStartPagesToPagination();

    expect(component.pages.length).toBe(lessThanFive);
    expect(component.pages).toContain(1);
    expect(component.pages).toContain(2);
    expect(component.pages).toContain(3);
  });

  it('the pagination element should show 2 previous, current and 2 next pages when user\'ve change the page', () => {
    const randomPage = 55;
    component.lastPage = moreThanFive;
    component.fillCurrentPagesToPagination(randomPage);

    expect(component.pages.length).toBe(MAX_BUTTONS_COUNT);
    expect(component.pages).toContain(53);
    expect(component.pages).toContain(54);
    expect(component.pages).toContain(55);
    expect(component.pages).toContain(56);
    expect(component.pages).toContain(57);
  });

  it('if there are more than 500 pages pagination element should have 500 pages max (limit of API)', () => {
    const moreThanFiveHundred = 1000;
    component.setPagination = moreThanFiveHundred;

    expect(component.lastPage).toBe(maxPages);
  });
});
