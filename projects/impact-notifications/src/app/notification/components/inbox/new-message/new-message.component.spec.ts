import { NewMessageComponent } from './new-message.component';
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { matModule } from 'projects/impact-notifications/src/app/module.cont';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('NewMessage', () => {
  let snackBarSpy;
  let notificationServiceSpy;
  let component: NewMessageComponent;
  let fixture: ComponentFixture<NewMessageComponent>;
  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['create']);
    TestBed.configureTestingModule({
      declarations: [NewMessageComponent],
      imports: [CommonModule, ReactiveFormsModule,
        ...matModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: MatSnackBar, useValue: snackBarSpy
      }, {
        provide: NotificationService, useValue: notificationServiceSpy
      },
      {
        provide: MAT_DIALOG_DATA, useValue: {
          users: [{ username: 'john', email: 'john@gmail.com' },
          { username: 'neena', email: ' neena@gmail.com' }
          ], sender: 'admin'
        },

      },
      { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  })
  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it(' create the component', () => {
    expect(component).toBeTruthy();
  });

  it('render all users', fakeAsync(() => {
    tick();
    const matSelect = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    matSelect.click();
    fixture.detectChanges()
    const options = fixture.debugElement.query(By.css('.user-info'));
    console.dir(fixture.debugElement.nativeElement);
    expect(component.data.users.length).toBe(2);
    expect(options.children.length).toBe(2);
  }));

  it('send messages on click', fakeAsync(() => {
    notificationServiceSpy.create.and.returnValue(of({
      status: 'SUCCESS',
      message: 'Notification Sent'
    }))
    component.messageForm.controls['recipient'].setValue({ username: 'admin', email: 'admin@gmail.com' });
    component.messageForm.controls['message'].setValue('Hello admin');
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('#btn-submit'));
    buttonElement.triggerEventHandler('click', null);
    tick();
    expect(notificationServiceSpy.create).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalled();
  }));

  it('disable the submit button when form is in invalid state',fakeAsync(()=>{
    component.messageForm.controls['recipient'].setValue(null);
    component.messageForm.controls['message'].setValue(null);
    fixture.detectChanges();
    tick();
    expect(component.messageForm.invalid).toBeTrue();

   expect(fixture.debugElement.nativeElement.querySelector('#btn-submit').disabled).toBeTruthy();
  }))
});
