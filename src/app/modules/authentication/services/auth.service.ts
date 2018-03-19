import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  public isAuthenticated(): boolean {
    let jwtHelper: JwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    return token ? !jwtHelper.isTokenExpired(token) : null;
  }

  public signout() {
    localStorage.removeItem('token');
    localStorage.setItem('prev_session', 'true');
    this.router.navigate(['/login']);
  }
} 