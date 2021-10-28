import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from "@angular/common";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MatSnackBar } from "@angular/material/snack-bar";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SessionManagerService, UserService } from "@impactech/common";
import { matModule } from "projects/impact-notifications/src/app/module.cont";
import { of } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { InboxComponent } from "./inbox.component";
import { NewMessageComponent } from "./new-message/new-message.component";
describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;
  let sessionSpy;
  let matSnackBarSpy;
  let notificationServiceSpy;
  let userServiceSpy;
  let dialogSpy;
  beforeEach(async () => {
    sessionSpy = jasmine.createSpyObj('SessionManagerService', ['User']);
    sessionSpy.User.and.returnValue('admin');
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['get']);
    notificationServiceSpy.get.and.returnValue(of([
      { sender: "neena", message: "Let's have a cofee now", timestamp: "2021-10-27T15:02:35.969Z", id: 1 },
      { sender: "John", message: "Let's have a walk now", timestamp: "2021-10-27T15:01:35.969Z", id: 2 }
    ]))
    userServiceSpy = jasmine.createSpyObj('UserService', ['get']);
    userServiceSpy.get.and.returnValue(of([
      { username: "admin", email: "binson007@gmail.com" },
      { username: "neena", email: "neena@gmail.com" },
      { username: "john", email: "john@gmail.com" }
    ]));
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      declarations: [InboxComponent, NewMessageComponent],
      imports: [CommonModule,
        ...matModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: UserService, useValue: userServiceSpy
      }, {
        provide: SessionManagerService, useValue: sessionSpy
      },
      { provide: MatSnackBar, useValue: matSnackBarSpy },
      { provide: NotificationService, useValue: notificationServiceSpy },
      { provide: MatDialog, useValue: dialogSpy }
      ]
    })
      .compileComponents();
  })
  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(' create the component', () => {
    expect(component).toBeTruthy();
  });
  it('render all messages', fakeAsync(() => {
    tick();
    const messagesElements = fixture.debugElement.query(By.css('.message'))
    expect(component.messages.length).toBe(2);
    expect(messagesElements.children.length).toBe(2);
  }));
  it('render add button', () => {
    const newBtn = fixture.debugElement.query(By.css('#btn-new'));
    expect(newBtn).toBeDefined();
  })

  it('show the dialog when add button clicked', () => {
    const buttonElement = fixture.debugElement.query(By.css('#btn-new'));
    buttonElement.triggerEventHandler('click', null);
    expect(dialogSpy.open).toHaveBeenCalled();
  })
});
