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

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UsersListDetailsComponent } from './users-list-details/users-list-details.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SitesListDetailsComponent } from './sites-list-details/sites-list-details.component';
import { SitesComponent } from './sites/sites.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { EntitiesComponent } from './entities/entities.component';
import { ActivitiesComponent } from './activities/activities.component';
import { PositionsComponent } from './positions/positions.component';
import { SitetypesComponent } from './sitetypes/sitetypes.component';
import { SiteresponsibilitiesComponent } from './siteresponsibilities/siteresponsibilities.component';
import { CompaniesComponent } from './companies/companies.component';
import { DepartmentsComponent } from './departments/departments.component';
import { TimegroupComponent } from './timegroup/timegroup.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { PlacesComponent } from './places/places.component';
import { UserMapComponent } from './user-map/user-map.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { SearchPipe } from '../pipes/search.pipe';

import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { GoogleMapsModule } from '@angular/google-maps';
import { ChatComponent } from './chat/chat.component';
import { SettingsComponent } from './settings/settings.component';
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
    LoginComponent

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
