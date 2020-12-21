// import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QRCodeModule } from 'angular2-qrcode';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'core/helper/jwt.interceptor';
import { GoogleMapsModule } from '@angular/google-maps';
import { TestComponent } from './test/test.component';

import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ErrorInterceptor } from 'core/helper/error.interceptor';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {DialogService} from 'core/services/dialog.service';
import { NotificationDialogService } from 'core/services/notificationDialog.service';
import { CustomValidationService } from 'core/validators/CustomvalidationService.validator';
import { CanDeactivateGuard } from 'core/services/can-deactivate-guard.service';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

import {
  NgxMatDatetimePickerModule, 
  NgxMatNativeDateModule, 
  NgxMatTimepickerModule 
} from '@angular-material-components/datetime-picker';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    QRCodeModule,
    AppRoutingModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    GoogleMapsModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
    TimepickerModule,
    NgxMatDatetimePickerModule, 
    NgxMatNativeDateModule,
    // TimePickerComponent,
    // ButtonComponent,

    // CalendarModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    TestComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: 'DialogService', useClass: DialogService },


    NotificationDialogService,
    CustomValidationService,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent],
  // entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
