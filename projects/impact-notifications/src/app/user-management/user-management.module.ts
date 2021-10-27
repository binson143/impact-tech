import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { RouterModule, Routes } from '@angular/router';
import { matModule } from '../module.cont';

const routes: Routes = [{
  path: '', component: ProfileEditorComponent
}]

@NgModule({
  declarations: [ProfileEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ...matModule
  ],
  exports: [RouterModule]
})
export class UserManagementModule { }
