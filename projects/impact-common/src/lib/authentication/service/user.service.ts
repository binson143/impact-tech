import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterInfo } from '../models/register.model';
import { IMP_API_URL } from '../tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient, @Inject(IMP_API_URL) public apiUrl: String) { }

  get(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/users`);
  }
  getByName(username: string): Observable<any> {
    const params = new HttpParams().append('username', username);
    return this.httpClient.get(`${this.apiUrl}/userByName`, { params });

  }
  update(user: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/updateUser`, user);
  }
  register(data: RegisterInfo): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, data);
  }
}
