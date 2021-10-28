import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionManagerService,UserService } from '@impactech/common';

@Component({
  selector: 'app-profile-editor',
  templateUrl: 'profile-editor.component.html'
})
export class ProfileEditorComponent implements OnInit {
  isEdit = false;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sessionService: SessionManagerService,
    private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.buildForm();
    this.getCurrentUserProfile();
  }
  buildForm(): void {
    this.profileForm = this.fb.group({
      username: new FormControl({ value: '', disabled: true }, [Validators.required]),
      email: new FormControl({ value: '', disabled: !this.isEdit }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: !this.isEdit }, [Validators.required])
    });
  }
  getCurrentUserProfile(): void {
    this.userService.getByName(this.sessionService.User).subscribe(profile => {
      if (profile) {
        this.profileForm.patchValue(profile);
        this.disableForm();
      }
    });
  }
  onEdit(): void {
    this.isEdit = true;
    this.enableForm();

  }
  onSubmit(): void {
    this.isEdit = false;
    this.profileForm.get('username').enable();
    this.userService.update(this.profileForm.value).subscribe(_ => {
      this.disableForm();
      this.snackBar.open('Profile details updated!.', 'Success', { duration: 1000 });
    });

  }

  private disableForm(): void {
    this.profileForm.get('email').disable();
    this.profileForm.get('password').disable();
    this.profileForm.get('username').disable();
  }
  private enableForm(): void {
    this.profileForm.get('email').enable();
    this.profileForm.get('password').enable();
  }
}
