import { ChangeDetectionStrategy, Component } from '@angular/core';
import LoaderService from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeaderComponent {
  defaultColor = 'white';

  constructor(public loader: LoaderService) {}
}
