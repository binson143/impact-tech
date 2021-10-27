import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RegisterInfo } from '../../models/register.model';
@Component({
  selector: 'imp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  @Input() registerModel: RegisterInfo;
  @Input() formFields?: FormlyFieldConfig[] = [];
  @Output() register: EventEmitter<RegisterInfo> = new EventEmitter<RegisterInfo>();
  constructor() { }
  ngOnInit(): void {
    // user can add additional fields if they  wish .
    const minimumRequiredFieldConfiguration = [{
      key: 'email',
      type: 'input',
      id: 'email',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
        type: 'email'
      },
      validators: {
        validation: [Validators.email],
      },
      validationMessages: [
        { name: 'email', message: 'Valid email required.' },
      ]
    },
    {
      key: 'username',
      type: 'input',
      id: 'username',
      templateOptions: {
        label: 'Username',
        placeholder: 'Enter username',
        required: true,

      }
    },
    {
      key: 'password',
      type: 'input',
      id: 'password',
      templateOptions: {
        type: 'password',
        label: 'Password ',
        placeholder: 'Enter password',
        required: true,
      }
    }
    ];
    this.formFields = [...this.formFields, ...minimumRequiredFieldConfiguration];
  }
  onSubmit() {
    if (this.register) {
      this.register.emit(this.registerForm.value);
    }
  }
}
