import { NgModule } from '@angular/core';

import { InboxComponent } from './components/inbox/inbox.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewMessageComponent } from './components/inbox/new-message/new-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { matModule } from '../module.cont';
const routes: Routes = [{
  path: '', component: InboxComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule,
  ...matModule
  ],
  exports: [RouterModule],
  declarations: [InboxComponent, NewMessageComponent],
  providers: [],
})
export class NotificationModule { }
