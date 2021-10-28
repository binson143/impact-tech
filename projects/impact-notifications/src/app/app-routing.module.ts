import { NgModule } from '@angular/core';
import { async } from '@angular/core/testing';

import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';


const routes: Routes = [
  {
    path: '', loadChildren: async () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'app', component: IndexComponent, children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      }, {
        path: 'dashboard', loadChildren: async () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)

      },
      {
        path: 'inbox', loadChildren: async () => import('./notification/notification.module').then(m => m.NotificationModule)
      },
      {
        path: 'profile', loadChildren: async () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
