import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
describe('NotificationService', () => {

  const testNotifications = [
    { sender: "neena", timestamp: "2021-10-26T15:02:35.969Z", id: 2 },
    { sender: "george", timestamp: "2021-10-27T15:02:35.969Z", id: 3 },
    { sender: "peter", timestamp: "2021-10-27T15:02:35.969Z", id: 4 },
    { sender: "neena", timestamp: "2021-10-27T15:02:35.969Z", id: 5 },
    { sender: "mathew", timestamp: "2021-10-26T15:02:35.969Z", id: 6 },
    { sender: "mathew", timestamp: "2021-10-27T15:02:35.969Z", id: 7 },
    { sender: "kiran", timestamp: "2021-10-22T15:02:35.969Z", id: 8 },
    { sender: "kiran", timestamp: "2021-10-22T15:02:35.969Z", id: 9 }
  ]
  let service: NotificationService;
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(NotificationService);
    controller = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    controller.verify();
  });

  it('list all notifications', () => {
    let messages
    const url = 'https://localhost:42000/notifications?username=admin';;
    service.get('admin').subscribe(d => { messages = d; });
    controller.expectOne(url).flush([
      { sender: "neena", message: "Let's have a cofee now", timestamp: "2021-10-27T15:02:35.969Z", id: 2 }
    ]);
    expect(messages.length).toEqual(1);
  });
  it('list latest messages', () => {
    const expected = [3,4,5];
    const latestMessages = service.getRecentMessages(3, [...testNotifications]).map(d=>d['id']) // capturing id

    expect(latestMessages.length).toBe(3);
    expect(latestMessages).toEqual(expected);
  });
  it('list frequent users',()=>{
    const expected=["neena","mathew","george","peter"];
    const frequentUsers = service.getFrequentUsers( [...testNotifications]);

    expect(frequentUsers).toEqual(expected);
  });

  it('list user per messages',()=>{
    const expected=[{name: 'neena', value: 2},{name: 'george', value: 1},{name: 'peter', value: 1},
    {name: 'mathew', value: 2},{name: 'kiran', value: 2}]
    const messagesPerUser=[];
    const frequentUsers = service.getMessagePerUser( [...testNotifications]);
    for (const [key, value] of frequentUsers) {
      messagesPerUser.push(
        {
          name: key,
          value: value.length
        }
      );
    }
    expect(messagesPerUser).toEqual(expected);
  });

})
