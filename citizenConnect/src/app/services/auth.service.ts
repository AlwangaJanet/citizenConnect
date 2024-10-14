import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/usersModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;


  constructor(private http: HttpClient) {}

  loginUser(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', credentials);
  }

  storeUserData(response: LoginResponse) {
    this.token = response.token;
    localStorage.setItem('token', this.token);
  }

  getUserRole(): string {
    if (this.token) {
      const decoded: any = jwtDecode(this.token);
      return decoded.role;
    }
    return '';
  }

  showStatus(): boolean {
    return !!this.token;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  getRole(): string {
    return this.getUserRole();
  }

  isApproved(): boolean {
    if (this.token) {
      const decoded: any = jwtDecode(this.token);
      return decoded.isApproved;
    }
    return false;
  }
}