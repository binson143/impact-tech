import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/impact-notifications/src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private httpClient: HttpClient) { }
  get(username: string): Observable<any> {
    const params = new HttpParams().append('username', username);
    return this.httpClient.get(`${environment.api}/notifications`, { params });
  }
  create(data: { recipient: string, notification: any }): Observable<any> {
    return this.httpClient.post(`${environment.api}/sendNotification`, data);
  }
  delete(data): Observable<any> {
    return this.httpClient.post(`${environment.api}/deleteMessage`, data);
  }
  getRecentMessages(numberOfMessage: number, notifications: Array<{ sender: string, timestamp: number }>) {
    if (notifications?.length > numberOfMessage) {
      return notifications.slice(-Math.abs(numberOfMessage)).reverse();
    }
    else {
      return notifications.reverse();
    }
  }
  getFrequentUsers(notifications: Array<{ sender: string, timestamp: Date }>): any {
    // on what basis is ‘Frequent users in chat' computed, recent chats:( ?? total number of chats ??.
    // lets make a fuzzy logic here.
    // get messages exchanged by per day.
    // list 5  users who contacted the user in most number of days.
    const result = {};
    const lastMessage = notifications[notifications.length - 1];
    const lowerDate = new Date(lastMessage.timestamp);
    lowerDate.setDate(lowerDate.getDate() - 3);
    const recentNotifications = notifications.filter(x => new Date(x.timestamp) >= lowerDate);
    const dateProp = 'actualDate';
    recentNotifications.forEach(d => {
      d[dateProp] = new Date(d.timestamp).toLocaleDateString();
    });
    const messageGroup = this.groupBy(recentNotifications, x => x.actualDate);
    for (const [key, value] of messageGroup) {
      value.forEach(element => {
        if (result[element.sender]) {
          result[element.sender] = result[element.sender] + 1;
        } else {
          result[element.sender] = 1;
        }
      });
    }
    const users = Object.keys(result).sort((a, b) => result[b] - result[a]);
    return users;
  }
  getMessagePerUser(notifications: Array<{ sender: string }>): any {
    return this.groupBy(notifications, notification => notification.sender);
  }
  // move this to common lib.
  private groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
