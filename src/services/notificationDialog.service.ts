import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationDialogService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  }


  success(msg: string) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '',this.config);
  }

  warn(msg: string) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }

  error(msg: string) {
    this.config['panelClass'] = ['notification', 'danger'];
    this.snackBar.open(msg, '', this.config);
  }
}
