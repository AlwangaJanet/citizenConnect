import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AddUser, LoginReq, LoginResponse, Official, RegisterResponse, User } from '../../app/models/usersModel';
import {jwtDecode} from 'jwt-decode'; // Correct import statement

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly Base_URL = "http://localhost:4000/auth/";

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor(private http: HttpClient) {}

  registerUser(newUser: AddUser): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.Base_URL + "register", newUser);
  }

  loginUser(user: LoginReq): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.Base_URL + 'login', user, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response: LoginResponse) => {
        if (response && response.token) {
          this.storeUserData(response);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  storeUserData(userData: LoginResponse): void {
    localStorage.setItem('token', userData.token);
    const decodedToken = jwtDecode<{ role: string, isApproved: boolean }>(userData.token); // Type assertion
    localStorage.setItem('user', JSON.stringify(decodedToken));
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log('User Data:', userData);  // Add this line to debug
      return userData.role;
    }
    return null;
  }

  isApproved(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.role === 'Official' || userData.isApproved;
    }
    return false;
  }

  decodeToken(token: string): any {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);
      return decoded;
    } catch (error) {
      console.error('Token decoding error:', error);
      return {};
    }
  }

  getUnapprovedOfficials(): Observable<User[]> {
    return this.http.get<User[]>(`${this.Base_URL}unapproved-officials`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.Base_URL}users`, { headers: this.getHeaders() });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.Base_URL}users/${userId}`, { headers: this.getHeaders() });
  }

  approveOfficial(officialId: string): Observable<any> {
    return this.http.put(`${this.Base_URL}users/approve/${officialId}`, {}, { headers: this.getHeaders() });
  }

  updateUser(userId: string, userData: Partial<User>): Observable<any> {
    return this.http.put(`${this.Base_URL}users/${userId}`, userData, { headers: this.getHeaders() });
  }

  getCurrentUser(): { role: string } | null {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
}
