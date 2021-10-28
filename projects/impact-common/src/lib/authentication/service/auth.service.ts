import { IMP_API_URL } from './../tokens';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Login } from '../models/login.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private httpClient: HttpClient, @Inject(IMP_API_URL) public apiUrl: string) { }
  login(login: Login): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, login);
  }


}
