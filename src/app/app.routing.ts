import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'core/helper/auth.guard';
import { TranslateModule } from '@ngx-translate/core';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';

const routes: Routes = [
  // { path: '', canActivate: [AuthGuard], loadChildren: () => AdminLayoutModule, outlet: 'primary' },
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
   
  ],
})
export class AppRoutingModule { }
