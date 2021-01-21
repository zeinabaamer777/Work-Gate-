import { MatConfirmDialogComponent } from 'app/mat-confirm-dialog/mat-confirm-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { SearchPipe } from '../../../core/pipes/search.pipe';
import { DatePipe } from '@angular/common';

import { UserDetailsComponent } from '../../user-details/user-details.component';
import { SitesListDetailsComponent } from '../../sites-list-details/sites-list-details.component';
import { SitesComponent } from 'app/sites/sites.component';
import { SiteDetailsComponent } from 'app/site-details/site-details.component';
import { EntitiesComponent } from 'app/entities/entities.component';
import { ActivitiesComponent } from 'app/all-activites/activities/activities.component';
import { PositionsComponent } from 'app/positions/positions.component';
import { SitetypesComponent } from 'app/sitetypes/sitetypes.component';
import { RolesComponent } from 'app/roles/roles.component';
import { DepartmentsComponent } from 'app/all-departments/departments/departments.component';
import { TimegroupComponent } from 'app/all-time-groups/timegroup/timegroup.component';
import { DivisionsComponent } from 'app/all-divisions/divisions/divisions.component';
import { PlacesComponent } from 'app/all-places/places/places.component';
import { ViewUserComponent } from 'app/view-user/view-user.component';
import { GoogleMapComponent } from 'app/google-map/google-map.component';
// import { CrudComponent }

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GoogleMapsModule } from '@angular/google-maps';
import { ChatComponent } from 'app/chat/chat.component';
import { SettingsComponent } from 'app/settings/settings.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CrudComponent } from 'app/all-activites/activites-crud/crud.component';
import { DepartmentsCrudComponent } from 'app/all-departments/departments-crud/departments-crud.component';
import { PositionsFormComponent } from 'app/positions/positions-form/positions-form.component';
import { ComapnyFormComponent } from 'app/companies/comapny-form/comapny-form.component';
import { SiteTypeFormComponent } from 'app/sitetypes/site-type-form/site-type-form.component';
import { RolesFormComponent } from 'app/roles/roles-form/roles-form.component';
import { MatTableModule } from '@angular/material/table';
import { DivisionsCrudComponent } from 'app/all-divisions/divisions-crud/divisions-crud.component';
import { PlacesFormComponent } from 'app/all-places/places-form/places-form.component';
import { CompaniesComponent } from 'app/companies/companies.component';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {DialogService} from 'core/services/dialog.service';
import { NotificationDialogService } from 'core/services/notificationDialog.service';
import { TimegroupCrudComponent } from 'app/all-time-groups/timegroup-crud/timegroup-crud.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';


// loader module


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    NgxSpinnerModule,
    GoogleMapsModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    // DatePipe,
    BsDatepickerModule.forRoot(),
    TranslateModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ActivitiesComponent,
    PositionsComponent,
    SitetypesComponent,
    SiteTypeFormComponent,
    RolesComponent,
    RolesFormComponent,
    CompaniesComponent,
    DepartmentsComponent ,
    DivisionsComponent,
    TimegroupComponent,
    PlacesComponent,
    UserDetailsComponent,
    SitesListDetailsComponent,
    SitesComponent,
    SiteDetailsComponent,
    EntitiesComponent,
    ViewUserComponent,
    GoogleMapComponent,
    ChatComponent,
    SettingsComponent,
    CrudComponent,
    SearchPipe,
    DepartmentsCrudComponent,
    PositionsFormComponent,
    // CompanySelectorComponent,
    // DepartmentSelectorComponent,
    // DivisionSelectorComponent,
    // PositionSeleclorComponent,
    DivisionsCrudComponent,
    PlacesFormComponent,
    SearchPipe,
    SiteTypeFormComponent,
    RolesFormComponent,
    ComapnyFormComponent,
    TimegroupCrudComponent,
    MatConfirmDialogComponent

  ],
  exports: [],
  providers:[DatePipe,DialogService,NotificationDialogService] ,
  entryComponents: [MatConfirmDialogComponent]
})


export class AdminLayoutModule {}
