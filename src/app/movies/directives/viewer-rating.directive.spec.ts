import { ComponentFixture, TestBed } from '@angular/core/testing';
import IMovie from 'src/app/shared/models/movies.model';
import CoverComponent from '../components/cover/cover.component';
import ViewerRatingDirective, { AvailableColor as colors } from './viewer-rating.directive';

describe('ViewerRatingDirective', () => {
  let fixture: ComponentFixture<CoverComponent>;

  const apiResponse: IMovie = {} as any;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CoverComponent, ViewerRatingDirective],
    })
      .createComponent(CoverComponent);
  });

  it('should create an instance', () => {
    const directive = new ViewerRatingDirective();
    expect(directive).toBeTruthy();
  });

  it('background of the element should have a green color when rating is more or equal of 7', () => {
    apiResponse.vote_average = 7.5;
    fixture.componentInstance.cardData = apiResponse;

    fixture.detectChanges();

    const div: HTMLElement = fixture.nativeElement.querySelector('.rating');
    expect(div.style.backgroundColor).toBe(colors.Green);
  });

  it('background of the element should have a orange color when rating is more or equal of 6 but less than 7', () => {
    apiResponse.vote_average = 6.5;
    fixture.componentInstance.cardData = apiResponse;

    fixture.detectChanges();

    const div: HTMLElement = fixture.nativeElement.querySelector('.rating');
    expect(div.style.backgroundColor).toBe(colors.Orange);
  });

  it('background of the element should have a gray color when rating is more or equal of 4.5 but less than 6', () => {
    apiResponse.vote_average = 4.8;
    fixture.componentInstance.cardData = apiResponse;

    fixture.detectChanges();

    const div: HTMLElement = fixture.nativeElement.querySelector('.rating');
    expect(div.style.backgroundColor).toBe(colors.Gray);
  });

  it('background of the element should have a red color when rating is less than 4.5', () => {
    apiResponse.vote_average = 2.3;
    fixture.componentInstance.cardData = apiResponse;

    fixture.detectChanges();

    const div: HTMLElement = fixture.nativeElement.querySelector('.rating');
    expect(div.style.backgroundColor).toBe(colors.Red);
  });
});
