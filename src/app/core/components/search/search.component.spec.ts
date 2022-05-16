import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Subscription } from 'rxjs';
import SharedModule from 'src/app/shared/shared.module';

import SearchComponent from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [SharedModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe', () => {
    component.subscriptions = [new Subscription(), new Subscription()];
    component.subscriptions.forEach((subscription) => {
      const unsubscriptionSpy = spyOn(subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscriptionSpy).toHaveBeenCalled();
    });
  });
});
