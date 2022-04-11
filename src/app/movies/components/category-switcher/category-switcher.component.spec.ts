import { ComponentFixture, TestBed } from '@angular/core/testing';

import CategorySwitcherComponent from './category-switcher.component';

describe('CategorySwitcherComponent', () => {
  let component: CategorySwitcherComponent;
  let fixture: ComponentFixture<CategorySwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorySwitcherComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
