import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SessionManagerService } from '@impactech/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  template: `<imp-login (login)="handleLogin($event)"></imp-login>`,
  styles: [
    ':host:{display: flex;justify-content: center;align-items: center;height: 100vh;}'
  ]
})
export class LoginContainerComponent {
  constructor(private authService: AuthService, private toaster: ToastrService, private router: Router, private sessionManager: SessionManagerService) { }

  public handleLogin(e: Login): void {
    this.authService.login(e).subscribe((d: { authenticated: boolean }) => {
      console.dir(d);
      if (d.authenticated) {
        this.sessionManager.loggedIn(e.username);
        this.router.navigate(['./app']);
      } else {
        this.toaster.error('User details not found.')
      }
    })
  }
}
