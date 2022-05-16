import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import LanguageService from 'src/app/shared/services/language.service';

const LANGUAGE_BY_DEFAULT = 'en';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LanguageSwitcherComponent implements OnInit {
  public activeLanguage = LANGUAGE_BY_DEFAULT;

  public availableLangs: string[] | { id: string; label: string }[] = [];

  constructor(private transloco: TranslocoService, private service: LanguageService) {}

  ngOnInit() {
    this.activeLanguage = this.transloco.getActiveLang();
    this.availableLangs = this.transloco.getAvailableLangs();
  }

  changeLanguage(event: Event) {
    if (event instanceof PointerEvent) {
      const { target } = event;
      this.activeLanguage = (target as HTMLButtonElement).innerText.toLowerCase();
      this.transloco.setActiveLang(this.activeLanguage);
      this.service.$language.next(this.activeLanguage);
    }
  }
}
