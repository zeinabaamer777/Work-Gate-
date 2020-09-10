import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { MatSnackBarModule } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationDialogService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {

    panelClass: 'style-success',
    duration: 10000,
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
}
