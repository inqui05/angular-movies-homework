import { ComponentFixture, TestBed } from '@angular/core/testing';
import HttpService from 'src/app/shared/services/http.service';
import MoviesModule from '../../movies.module';

import MoviesComponent from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let service: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [MoviesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search movies by phrase when the variable isSearch = true', () => {
    component.isSearch = true;
    const searchSpy = spyOn(service, 'searchMovie');
    component.getNewData();
    expect(searchSpy).toHaveBeenCalled();
  });
});
