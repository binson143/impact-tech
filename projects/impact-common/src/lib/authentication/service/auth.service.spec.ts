import { IMP_API_URL } from './../tokens';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthService;
  let controller: HttpTestingController;
  const loginUrl = `/login`;

  const requestData = { authenticated: true, userDetails: { username: 'binson143', email: 'binson143@gmail.com', password: 'admin@007' } };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService,
        { provide: IMP_API_URL, useValue: '' }
      ],
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


})
