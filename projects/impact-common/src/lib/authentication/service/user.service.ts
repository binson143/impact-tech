import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/impact-notifications/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get(`${environment.api}/users`)
  }
  getByName(username: string): Observable<any> {
    const params = new HttpParams().append('username', username);
    return this.httpClient.get(`${environment.api}/userByName`, { params: params });

  }
  update(user: any): Observable<any> {
    return this.httpClient.post(`${environment.api}/updateUser`, user)
  }
}
