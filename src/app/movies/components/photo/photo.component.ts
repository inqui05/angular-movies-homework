import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhotoComponent {
  @Input() photo: string | null = null;
}
