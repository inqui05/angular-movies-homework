import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  public activeLanguage = 'en';

  public availableLangs: string[] | { id: string; label: string }[] = [];

  constructor(private transloco: TranslocoService) {}

  ngOnInit() {
    this.activeLanguage = this.transloco.getActiveLang();
    this.availableLangs = this.transloco.getAvailableLangs();
  }

  changeLanguage(event: Event) {
    if (event instanceof PointerEvent) {
      const { target } = event;
      this.activeLanguage = (target as HTMLButtonElement).innerText.toLowerCase();
      this.transloco.setActiveLang(this.activeLanguage);
    }
  }
}
