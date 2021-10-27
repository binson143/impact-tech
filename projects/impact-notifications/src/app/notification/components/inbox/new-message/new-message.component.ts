import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@impactech/common';
import { filter } from 'rxjs/operators';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {

  messageForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<NewMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      recipient: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    })
  }


  onClose(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    const notification = {
      sender: this.data.sender,
      message: this.messageForm.value.message,
      timestamp: new Date(),
      id: Math.ceil(Math.random() * Date.now())
    }
    this.notificationService.create({ recipient: this.messageForm.value.recipient.username, notification: notification }).subscribe(d => {
      this.snackBar.open("Message send successfully", "Done!", {
        duration: 1000,
      });
    })
  }
}
