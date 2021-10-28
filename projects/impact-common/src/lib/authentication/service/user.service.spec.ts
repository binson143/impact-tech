import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { IMP_API_URL } from "../tokens";
import { UserService } from "./user.service"
describe('UserService', () => {
  let service: UserService;
  let controller: HttpTestingController;
  const registerUrl = `/register`;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: IMP_API_URL, useValue: '' }],
    });
    service = TestBed.inject(UserService);
    controller = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    controller.verify();
  });
  it('register the user', () => {
    let registerData = null;
    service.register({ username: 'binson143', password: 'admin@007', email: 'binson143@gmail.com' }).subscribe(d => {
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

  it('list the user', () => {
    let users = null;
    service.get().subscribe(d => users = d);
    controller.expectOne('/users').flush(
      [{ username: 'tester', password: 'tester', email: 'tester@gmail.com' }]
    );
    expect(users).toBeInstanceOf(Array);
  })

  it('update the user', () => {
    let user = null;

    service.update({ username: 'testers', password: 'tester', email: 'tester@gmail.com' }).subscribe(d => user = d);
    controller.expectOne('/updateUser').flush(
      { username: 'testers', password: 'tester', email: 'tester@gmail.com' }
    );
    expect(user.username).toEqual('testers');
  })

})
