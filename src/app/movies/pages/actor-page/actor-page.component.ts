import { Component } from '@angular/core';

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.scss'],
})
export default class ActorPageComponent {
  public date = new Date();
}
