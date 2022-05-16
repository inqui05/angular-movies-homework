import {
  ComponentFixture, fakeAsync, TestBed, tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { delay, of } from 'rxjs';
import HttpService from 'src/app/shared/services/http.service';
import MoviesModule from '../../movies.module';
import { ISearchResponse } from '../../../shared/models/search-response.model';

import SearchPageComponent from './search-page.component';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let service: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPageComponent],
      imports: [MoviesModule, RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update data from the API', () => {
    const randomPage = '4';
    const getNewDataSpy = spyOn(component, 'getNewData');

    component.currentPage(randomPage);
    expect(getNewDataSpy).toHaveBeenCalled();
    expect(component.dataForRequest.page).toBe(+randomPage);
  });

  it('should call getNewData and return movie\'s data and number of pages', fakeAsync((): void => {
    const randomNumber = 89;
    const response: ISearchResponse = {} as any;
    response.total_pages = randomNumber;

    spyOn(service, 'searchMovie').and.returnValue(of(response).pipe(delay(50)));

    component.getNewData();

    fixture.detectChanges();

    tick(50);

    expect(component.moviesData).toEqual(response);
    expect(component.setPagination).toEqual(randomNumber);
  }));
});
