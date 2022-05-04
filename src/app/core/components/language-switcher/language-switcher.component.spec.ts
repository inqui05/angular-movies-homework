import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoModule } from '@ngneat/transloco';
import SharedModule from 'src/app/shared/shared.module';
import CoreModule from '../../core.module';

import LanguageSwitcherComponent from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSwitcherComponent],
      imports: [CoreModule, TranslocoModule, SharedModule],
    })
      .compileComponents();
    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have English language by default', () => {
    expect(fixture.debugElement.query(By.css('.language'))
      .nativeElement.innerText).toBe('EN');
  });
});
