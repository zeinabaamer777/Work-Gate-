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

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { GoogleMapsModule } from '@angular/google-maps';
 
import { TestComponent } from './test/test.component';
import { ComapnyFormComponent } from './companies/comapny-form/comapny-form.component';
import { ActivitySelectorComponent } from './selectors/activity-selector/activity-selector.component';
import { PlaceSelectorComponent } from './selectors/place-selector/place-selector.component';
import { CompanySelectorComponent } from './selectors/company-selector/company-selector.component';
import { DepartmentSelectorComponent } from './selectors/department-selector/department-selector.component';
import { DivisionSelectorComponent } from './selectors/division-selector/division-selector.component';
import { PositionSeleclorComponent } from './selectors/position-seleclor/position-seleclor.component';
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
    GoogleMapsModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    TestComponent,
    CompanySelectorComponent,
    DepartmentSelectorComponent,
    DivisionSelectorComponent,
    PositionSeleclorComponent,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
