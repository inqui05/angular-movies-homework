import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  public language = 'en';

  changeLanguage(event: Event) {
    if (event instanceof PointerEvent) {
      const { target } = event;
      this.language = (target as HTMLButtonElement).innerText;
    }
  }
}
