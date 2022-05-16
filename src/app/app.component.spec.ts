import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription } from 'rxjs';

import AppComponent from './app.component';
import AppModule from './app.module';
import HttpService from './shared/services/http.service';

describe('AppComponent', () => {
  let service: HttpService;
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule, HttpClientModule],
      declarations: [AppComponent],
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = TestBed.inject(HttpService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it("should have as title 'movies'", () => {
    expect(app.title).toEqual('movies');
  });

  it('should unsubscribe', () => {
    app.subscription = [new Subscription(), new Subscription()];
    app.subscription.forEach((subscription) => {
      const unsubscriptionSpy = spyOn(subscription, 'unsubscribe');
      app.ngOnDestroy();
      expect(unsubscriptionSpy).toHaveBeenCalled();
    });
  });

  it('should get all genres from the IMDB call once', () => {
    const action = 'Action';
    const fakeGenres = {
      genres: [
        { id: 28, name: 'Drama' },
        { id: 12, name: 'Adventure' },
        { id: 35, name: 'Comedy' },
        { id: 18, name: action },
      ],
    };

    fixture.detectChanges();

    spyOn(service, 'getGenres').and.callFake(() => of(fakeGenres));
    app.ngOnInit();

    service.allGenres$.subscribe((genres) => {
      expect(genres.genres.length).toBe(4);
    });
  });
});
