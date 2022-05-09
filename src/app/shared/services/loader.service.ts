import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class LoaderService {
  isDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
