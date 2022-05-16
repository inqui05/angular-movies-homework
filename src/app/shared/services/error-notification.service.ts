import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export default class ErrorNotificationService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, action = 'ok') {
    this.snackBar.open(message, action, { duration: 10000 });
  }

  hide() {
    this.snackBar.dismiss();
  }
}
