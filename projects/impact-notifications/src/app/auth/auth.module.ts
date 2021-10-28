import { AuthenticationModule } from '@impactech/common';
import { LoginContainerComponent } from './components/login-container.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { RegisterContainerComponent } from './components/register-container.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{
  path: '', redirectTo: 'login'
},
{
  path: 'login', component: LoginContainerComponent
},
{
  path: 'register', component: RegisterContainerComponent
}
];

@NgModule({
  imports: [AuthenticationModule, RouterModule.forChild(routes), MatSnackBarModule],
  exports: [RouterModule],
  declarations: [LoginContainerComponent, RegisterContainerComponent],
  providers: [],
})
export class AuthModule { }
