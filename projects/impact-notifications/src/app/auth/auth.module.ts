import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from '@impactech/common';
import { LoginContainerComponent } from './components/login-container.component';
import { RegisterContainerComponent } from './components/register-container.component';

const routes: Routes = [{
  path: '', redirectTo: 'login'
},
{
  path: 'login', component: LoginContainerComponent
},
{
  path: 'register', component: RegisterContainerComponent
}
]

@NgModule({
  imports: [AuthenticationModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [LoginContainerComponent,RegisterContainerComponent],
  providers: [],
})
export class AuthModule { }
