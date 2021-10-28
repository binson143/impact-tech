import { NgModule } from '@angular/core';
import { async } from '@angular/core/testing';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@impactech/common';
import { IndexComponent } from './layout/index/index.component';


const routes: Routes = [
  {
    path: '', loadChildren: async () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'app', component: IndexComponent, children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]
      }, {
        path: 'dashboard', loadChildren: async () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'inbox', loadChildren: async () => import('./notification/notification.module').then(m => m.NotificationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile', loadChildren: async () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [AuthGuard]
      }


    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
