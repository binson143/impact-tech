import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { default as mockEndpoints } from './mock.config';
let currentMockEndpoint;
@Injectable()
export class HttpMockApiInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    currentMockEndpoint = mockEndpoints[request.method] && mockEndpoints[request.method][request.url] || null;
    return currentMockEndpoint ? request.method === 'POST'
      ? currentMockEndpoint.handler(request.body) : currentMockEndpoint.handler(request.params) : next.handle(request);
  }
}
