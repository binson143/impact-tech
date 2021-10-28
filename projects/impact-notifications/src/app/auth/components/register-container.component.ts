import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterStatus } from '../model/register-status.enum';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  template: `<imp-register [registerModel]="formModel" (register)="handleRegister($event)"></imp-register>`,
  styles: [
    ':host:{display: flex;justify-content: center;align-items: center;height: 100vh;}'
  ]
})
export class RegisterContainerComponent {
  formModel = { username: '', password: '', email: '' };
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  public handleRegister(e): void {
    this.authService.register(e).subscribe((d: { message: string, status: RegisterStatus }) => {
      if (d.status === RegisterStatus.SUCCESS) {
        this.snackBar.open(d.message, 'Success');
        this.router.navigate(['./login']);
      } else {
        this.snackBar.open(d.message, 'Error');
      }
    });
  }
}
