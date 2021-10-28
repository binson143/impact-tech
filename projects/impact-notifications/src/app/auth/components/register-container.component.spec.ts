import { Router } from '@angular/router';
import { UserService } from './../../../../../impact-common/src/lib/authentication/service/user.service';
import { AuthenticationModule } from './../../../../../impact-common/src/lib/authentication/authentication.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterContainerComponent } from './register-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { of } from 'rxjs';
import { RegisterStatus } from '../model/register-status.enum';



describe('RegisterContainerComponent', () => {

  let component: RegisterContainerComponent;
  let fixture: ComponentFixture<RegisterContainerComponent>;
  let userServiceSpy;
  let routerSpy;
  let snackBarSpy;
  let originalTimeout
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;
    userServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      declarations: [RegisterContainerComponent],
      imports: [AuthenticationModule, MatSnackBarModule,
        FormlyModule.forRoot({
          extras: { lazyRender: true }, validationMessages: [

            { name: 'required', message: 'This field is required.' },
            { name: 'email', message: 'Valid email required.' }
          ],
        }),
        FormlyMaterialModule,
        BrowserAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });
  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it(' create the component', () => {
    expect(component).toBeTruthy();
  });

  it('handle register user request', () => {
    userServiceSpy.register.and.returnValue(of({ message: 'success', status: RegisterStatus.SUCCESS }))
    component.handleRegister({ username: 'admin', password: 'admin', email: 'admin@007' });
    expect(userServiceSpy.register).toHaveBeenCalledWith({ username: 'admin', password: 'admin', email: 'admin@007' });
    expect(snackBarSpy.open).toHaveBeenCalledWith('success', 'Success', { duration: 1500 });
    expect(routerSpy.navigate).toHaveBeenCalled();
    const navArgs = routerSpy.navigate.calls.first().args[0];
    // expecting to navigate to id of the component's first hero
    expect(navArgs[0]).toBe('./login', 'should nav to login Page');
  });

  it('handle invalid register attempt', () => {
    userServiceSpy.register.and.returnValue(of({ message: 'error', status: RegisterStatus.FAILED }))
    component.handleRegister({ username: 'admin', password: 'admin', email: 'admin@007' });
    expect(userServiceSpy.register).toHaveBeenCalledWith({ username: 'admin', password: 'admin', email: 'admin@007' });
    expect(snackBarSpy.open).toHaveBeenCalledWith('error', 'Error', { duration: 1500 });
  })
})
