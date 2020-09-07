import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { UsersListDetailsComponent } from 'app/users-list-details/users-list-details.component';
import { SitesListDetailsComponent } from '../../sites-list-details/sites-list-details.component';
import { EntitiesComponent } from '../../entities/entities.component';
import { ActivitiesComponent } from 'app/all-activites/activities/activities.component';
import { PositionsComponent } from 'app/positions/positions.component';
import { SitetypesComponent } from 'app/sitetypes/sitetypes.component';
import { SiteresponsibilitiesComponent } from 'app/siteresponsibilities/siteresponsibilities.component';
import { CompaniesComponent } from 'app/companies/companies.component';
import { DepartmentsComponent } from 'app/all-departments/departments/departments.component';
import { DivisionsComponent } from 'app/all-divisions/divisions/divisions.component';
import { TimegroupComponent } from 'app/timegroup/timegroup.component';
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { PlacesComponent } from 'app/places/places.component';
import { ViewUserComponent } from 'app/view-user/view-user.component';
import { ChatComponent } from 'app/chat/chat.component';
import { SettingsComponent } from 'app/settings/settings.component';
import { ActivitySelectorComponent } from 'app/selectors/activity-selector/activity-selector.component';
export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'user-profile',         component: UserProfileComponent },
    { path: 'table-list',           component: TableListComponent },
    { path: 'typography',           component: TypographyComponent },
    { path: 'icons',                component: IconsComponent },
    { path: 'maps',                 component: MapsComponent },
    { path: 'notifications',        component: NotificationsComponent },
    { path: 'upgrade',              component: UpgradeComponent },
    { path: 'users-list',           component: UsersListDetailsComponent },
    { path: 'sites-list',           component: SitesListDetailsComponent},
    { path: 'entities',             component: EntitiesComponent},
    { path: 'activities',           component: ActivitiesComponent},
    { path: 'positions',            component: PositionsComponent},
    { path: 'siteTypes',            component: SitetypesComponent},
    { path: 'siteResponsibilities', component: SiteresponsibilitiesComponent},
    { path: 'companies',            component: CompaniesComponent } ,
    { path: 'departments',          component: DepartmentsComponent},
    { path: 'divisions',            component: DivisionsComponent}, 
    { path: 'timeGroups',           component: TimegroupComponent},
    { path: 'places',               component: PlacesComponent},
    { path: 'chat',                 component: ChatComponent},
    { path: 'settings',             component: SettingsComponent},
    { path: 'users/:id',            component: ViewUserComponent},
    { path: 'test',                 component: ActivitySelectorComponent},  
    { path: '**',                   component: PageNotFoundComponent }
];
