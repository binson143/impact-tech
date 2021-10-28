import { Component, OnInit } from '@angular/core';
import { SessionManagerService } from '@impactech/common';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../../../notification/services/notification.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  recentMessages = [];
  messagesPerUser = [];
  frequentUsers = [];
  constructor(private notificationService: NotificationService, private sessionService: SessionManagerService) { }

  ngOnInit(): void {

    this.bootstrapDashboard();
  }


  bootstrapDashboard(): void {
    this.notificationService.get(this.sessionService.User).subscribe(notification => {
      this.recentMessages = this.notificationService.getRecentMessages(10, [...notification]);
      const messageMap = this.notificationService.getMessagePerUser([...notification]);
      for (const [key, value] of messageMap) {
        this.messagesPerUser.push(
          {
            name: key,
            value: value.length
          }
        );
      }
      this.frequentUsers = this.notificationService.getFrequentUsers([...notification]);
    });
  }


}

