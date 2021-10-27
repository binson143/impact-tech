import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { RegisterComponent } from './register.component';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  function updateForm(email, userEmail, userPassword) {
    component.registerForm.controls['username'].setValue(userEmail);
    component.registerForm.controls['password'].setValue(userPassword);
    component.registerForm.controls['email'].setValue(email);
  }
  const newUser = { username: 'binson143', password: 'admin', email: 'binson143@gmail.com' };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [MatFormFieldModule, MatInputModule,
        ReactiveFormsModule, MatButtonModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        FormlyModule.forRoot({
          extras: { lazyRender: true }, validationMessages: [
            { name: 'required', message: 'This field is required.' },
            { name: 'email', message: 'Valid email required.' }
          ]
        }),
        FormlyMaterialModule
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(' create the component', () => {
    expect(component).toBeTruthy();
  });
  it('render minimum required  fields and buttons', (() => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password');
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submit-btn');
    const email = fixture.debugElement.nativeElement.querySelector('#email');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(submitButton).toBeDefined();
    expect(email).toBeDefined();
  }));
  it('component initial state', () => {
    expect(component.registerForm).toBeDefined();
  });
  it('submit button is  disabled in initial state ',(()=>{
    const isSubmitDisabled = fixture.debugElement.nativeElement.querySelector('#submit-btn').disabled;
    expect(isSubmitDisabled).toBeTrue();
  }))
  it('submit button is  enabled when form is valid ',(()=>{
    updateForm(newUser.email, newUser.username, newUser.password);
    fixture.detectChanges();
    const isSubmitDisabled = fixture.debugElement.nativeElement.querySelector('#submit-btn').disabled;
    expect(isSubmitDisabled).toBeFalse();
  }))
  it('form value should update from when u change the input', (() => {
    updateForm(newUser.email, newUser.username, newUser.password);
    expect(component.registerForm.value).toEqual(newUser);
  }));
  it(' emit the form value when user clicks register', fakeAsync(() => {
    spyOn(component.register, 'emit');
    updateForm(newUser.email, newUser.username, newUser.password);
    fixture.debugElement.query(By.css('#register-form')).triggerEventHandler('ngSubmit', null);
    tick();
    fixture.detectChanges();
    expect(component.register.emit).toHaveBeenCalledWith(newUser)
  }));
  it('show the error messages when given invalid input ', (() => {
    updateForm('bin', null, null);
    fixture.detectChanges();
    const hasEmailError = component.registerForm.controls['email'].hasError('email');
    const hasUserNameRequiredError = component.registerForm.controls['username'].hasError('required');
    const hasPasswordRequiredError = component.registerForm.controls['password'].hasError('required');
    expect(hasEmailError).toBeTrue();
    expect(hasUserNameRequiredError).toBeTrue();
    expect(hasPasswordRequiredError).toBeTrue();
  }));
});
