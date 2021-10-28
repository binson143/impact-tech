import { TestBed } from "@angular/core/testing";
import { SessionManagerService } from "@impactech/common";
describe('SessionManagerService', () => {
  let service: SessionManagerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionManagerService],
    });
    service = TestBed.inject(SessionManagerService);
  });
  it('store login details ', () => {
    service.loggedIn('tester');
    const user = service.User;
    expect(user).toEqual('tester');
  });
  it('clear the login details   when logs out', () => {
    service.loggedIn('tester');
    service.loggedOut();
    const logged = service.IsAuthenticated;
    expect(logged).toBeFalse();
  })
})
