import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const validUser = { username: 'Binson', password: 'admin' }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule,
        MatButtonModule, FlexLayoutModule, BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['username'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  it(' create the component', () => {
    expect(component).toBeTruthy();
  });

  it(' render all fields and buttons', (() => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  }));

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
  });

  it('form value should update from when u change the input', (() => {
    updateForm(validUser.username, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  }));

  it(' emit the form value when user submit', fakeAsync(() => {
    spyOn(component.login, 'emit');

    updateForm(validUser.username, validUser.password);
    fixture.debugElement.query(By.css('#login-form')).triggerEventHandler('ngSubmit', null);
    tick();
    fixture.detectChanges();
    expect(component.login.emit).toHaveBeenCalledWith(validUser)
  }));


});
