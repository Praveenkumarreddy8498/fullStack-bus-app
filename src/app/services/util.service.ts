import { Injectable } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  userRoles: string[] = [];
  user: string = '';

  constructor(private _authService: AuthService) {}
  dateUtil(date: string): string {
    return new Date(date).toISOString().replace('Z', '');
  }
  getUserRole(): string {
    this.userRoles = this._authService.getRoles();
    if (this.userRoles.includes('manager')) {
      this.user = 'manager';
    } else if (this.userRoles.includes('editor')) {
      this.user = 'editor';
    } else if (this.userRoles.includes('viewer')) {
      this.user = 'viewer';
    }
    return this.user;
  }
}
