import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, RegisterInfo } from '@impactech/common';
import { environment } from 'projects/impact-notifications/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  login(login: Login): Observable<any> {
    return this.httpClient.post(`${environment.api}/login`, login);
  }
  register(data: RegisterInfo): Observable<any> {
    return this.httpClient.post(`${environment.api}/register`, data);
  }

}
