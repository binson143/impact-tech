import { Component, OnInit } from '@angular/core';
import { SessionManagerService, UserService } from '@impactech/common';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageComponent } from './new-message/new-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  messages = [];
  users = [];
  currentUser;
  constructor(
    private sessionService: SessionManagerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private userService: UserService) { }
  ngOnInit(): void {
    this.currentUser = this.sessionService.User;
    this.getUsers();
    this.getMessages();
  }
  getMessages(): void {
    this.notificationService.get(this.currentUser).subscribe(d => {
      console.dir(d);
      this.messages = this.notificationService.sortNotificationByDate(d);


    });
  }
  getUsers() {
    this.userService.get().subscribe(d => {
      this.users = d.filter(x => x.username !== this.currentUser);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(NewMessageComponent, {
      data: { users: this.users, sender: this.currentUser }
    });
  }
  onDelete(id): void {
    this.notificationService.delete({ id, username: this.currentUser }).subscribe(_ => {
      this.snackBar.open('Message deleted', 'deleted', {
        duration: 1000,
      });
      this.getMessages();
    });
  }
}
