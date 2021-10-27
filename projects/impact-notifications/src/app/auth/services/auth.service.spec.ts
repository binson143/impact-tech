
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from 'projects/impact-notifications/src/environments/environment';
describe('AuthenticationService', () => {
  let authenticationService: AuthService;
  let controller: HttpTestingController;
  const loginUrl = `${environment.api}/login`;
  const registerUrl = `${environment.api}/register`;
  const requestData = { authenticated: true, userDetails: { username: 'binson143', email: 'binson143@gmail.com', password: 'admin@007' } };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authenticationService = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    controller.verify();
  });

  it('logins the user', () => {
    let actualData;
    authenticationService.login({ username: 'binson143', password: 'admin@007' }).subscribe(d => {
      actualData = d;
    });
    controller.expectOne(loginUrl).flush(requestData);
    expect(actualData).toEqual(requestData);
  })
  it('register the user', () => {

    let registerData = null;
    authenticationService.register({ username: 'binson143', password: 'admin@007', email: 'binson143@gmail.com' }).subscribe(d => {
      registerData = d;
    });
    controller.expectOne(registerUrl).flush({
      staus: 'SUCCESS',
      message: 'User Registered Successfully'
    });
    expect(registerData).toEqual({
      staus: 'SUCCESS',
      message: 'User Registered Successfully'
    });

  })

})
