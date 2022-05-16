import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Subscription } from 'rxjs';
import IMovie from 'src/app/shared/models/movies.model';
import HttpService from 'src/app/shared/services/http.service';
import MoviesModule from '../../movies.module';
import CardComponent from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardInfo: IMovie;
  let service: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MoviesModule, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    service = TestBed.inject(HttpService);
    cardInfo = {} as any;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title on card', () => {
    const title = 'Matrix';
    cardInfo.title = title;
    component.cardData = cardInfo;

    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.title'));
    expect((titleElement.nativeElement as HTMLElement).textContent).toContain(title);
  });

  it('should unsubscribe', () => {
    component.subscription = [new Subscription(), new Subscription()];
    component.subscription.forEach((subscription) => {
      const unsubscriptionSpy = spyOn(subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscriptionSpy).toHaveBeenCalled();
    });
  });

  it('should find movie\'s genres', () => {
    const result = ['Drama', 'Action'];
    const fakeGenres = {
      genres: [
        { id: 28, name: result[2] },
        { id: 12, name: 'Adventure' },
        { id: 35, name: 'Comedy' },
        { id: 18, name: result[1] },
      ],
    };
    cardInfo.genre_ids = [18, 28];
    component.cardData = cardInfo;

    fixture.detectChanges();

    service.allGenres$.next(fakeGenres);
    component.ngOnInit();

    expect(component.genres.length).toBe(2);
    expect(component.genres).toContain(result[1]);
    expect(component.genres).toContain(result[2]);
  });
});
