import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { Login, SessionManagerService } from '@impactech/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  template: `<div class="place-center"><imp-login (login)="handleLogin($event)"></imp-login></div>`

})
export class LoginContainerComponent {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private sessionManager: SessionManagerService) { }

  public handleLogin(e: Login): void {
    this.authService.login(e).subscribe((d: { authenticated: boolean }) => {
      if (d.authenticated) {
        this.sessionManager.loggedIn(e.username);
        this.router.navigate(['./app']);
      } else {
        this.snackBar.open('User details not found', 'Login Error');
      }
    });
  }
}
