import {
  ComponentFixture, TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import LanguageService from 'src/app/shared/services/language.service';
import MoviesModule from '../../movies.module';

import ActorPageComponent from './actor-page.component';

describe('ActorPageComponent', () => {
  let component: ActorPageComponent;
  let fixture: ComponentFixture<ActorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActorPageComponent],
      imports: [MoviesModule, RouterTestingModule],
      providers: [LanguageService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActorPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
