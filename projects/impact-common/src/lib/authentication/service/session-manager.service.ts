import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionManagerService {
  private readonly STORAGE_KEY = 'imp-auth-info';
  loggedIn(username: string): void {
    window.sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify({ authenticated: true, username: username }))
  }
  loggedOut(): void {
    window.sessionStorage.removeItem(this.STORAGE_KEY);
  }
  get IsAuthenticated(): boolean {
    return window.sessionStorage.getItem(this.STORAGE_KEY) !== null;
  }
  get User(): string {
    const loginInfo = window.sessionStorage.getItem(this.STORAGE_KEY);
    if (loginInfo) {
      const user = JSON.parse(loginInfo);
      return user.username;
    }
    return '';
  }
}
1
