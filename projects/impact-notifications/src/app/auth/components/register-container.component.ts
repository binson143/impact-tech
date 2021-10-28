
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '@impactech/common';
import { RegisterStatus } from '../model/register-status.enum';

@Component({
  selector: 'app-register',
  template: `<div class="place-center"><imp-register [registerModel]="formModel" (register)="handleRegister($event)"></imp-register></div>`,

})
export class RegisterContainerComponent {
  formModel = { username: '', password: '', email: '' };
  constructor(private snackBar: MatSnackBar, private router: Router, private userService: UserService) { }

  public handleRegister(e): void {
    this.userService.register(e).subscribe((d: { message: string, status: RegisterStatus }) => {
      if (d.status === RegisterStatus.SUCCESS) {
        this.snackBar.open(d.message, 'Success', { duration: 1500 });
        this.router.navigate(['./login']);
      } else {
        this.snackBar.open(d.message, 'Error', { duration: 1500 });
      }
    });
  }
}
