import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from '../../models/login.model'


@Component({
  selector: 'imp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() login: EventEmitter<Login> = new EventEmitter<Login>();
  loginForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onLogin(): void {

    if (this.login) {
      this.login.emit(this.loginForm.value);
    }
  }
}
