import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { AuthenticationModule, AuthService, SessionManagerService } from "@impactech/common";
import { of } from "rxjs";
import { LoginContainerComponent } from "./login-container.component";
describe('LoginContainerComponent', () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;
  let authServiceSpy;
  let sessionSpy;
  let routerSpy;
  let matSnackBarSpy;
  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    sessionSpy = jasmine.createSpyObj('SessionManagerService', ['loggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      declarations: [LoginContainerComponent],
      imports: [AuthenticationModule, MatSnackBarModule, BrowserAnimationsModule
      ],
      providers: [{
        provide: AuthService, useValue: authServiceSpy
      }, {
        provide: SessionManagerService, useValue: sessionSpy
      },
      { provide: Router, useValue: routerSpy },
      { provide: MatSnackBar, useValue: matSnackBarSpy }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(' create the component', () => {
    expect(component).toBeTruthy();
  });
  it(' handle the login and redirect to home page.', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(of({ authenticated: true }))
    component.handleLogin({ username: 'admin', password: 'admin' });
    tick();
    fixture.detectChanges();
    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(sessionSpy.loggedIn).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalled();
    const navArgs = routerSpy.navigate.calls.first().args[0];
    // expecting to navigate to id of the component's first hero
    expect(navArgs[0]).toBe('./app', 'should nav to Home Page');
  }));
  it(' handle the invalid login attempt .', fakeAsync(() => {

    authServiceSpy.login.and.returnValue(of({ authenticated: false }))
    component.handleLogin({ username: 'admins', password: 'admins' });
    tick();
    fixture.detectChanges();
    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(matSnackBarSpy.open).toHaveBeenCalledWith('User details not found', 'Login Error', { duration: 1500 });

  }));
})
