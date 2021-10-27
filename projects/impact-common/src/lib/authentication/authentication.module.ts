import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './components/register/register.component';
import { FormlyModule } from '@ngx-formly/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, FlexLayoutModule, FormlyModule
  ],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthenticationModule { }
